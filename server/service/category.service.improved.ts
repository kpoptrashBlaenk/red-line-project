import { pool } from '#/app';
import { CategoryRaw } from '#/types/database';
import uniqueKey from '#/utils/uniqueKey';
import { Category, CategoryBody } from '$/types';
import { DictionaryService } from './dictionary.service';
import { ImageService } from './image.service';
import { BaseService } from './base.service';
import { CacheKeys } from '#/utils/cache';
import { logger } from '#/utils/logger';

export class CategoryServiceImproved extends BaseService {
  private dictionaryService: DictionaryService;
  private imageService: ImageService;

  constructor() {
    super(300); // 5 minutes cache TTL
    this.dictionaryService = new DictionaryService();
    this.imageService = new ImageService();
  }

  async findAll(): Promise<Category[]> {
    return this.withPerformanceMonitoring('findAll', async () => {
      return this.queryWithCache<Category>(
        `--sql
          SELECT
              c.id,
              jsonb_build_object(
                  'fr', d_name_fr.translation,
                  'en', d_name_en.translation
              ) AS name,
              jsonb_build_object(
                  'fr', d_description_fr.translation,
                  'en', d_description_en.translation
              ) AS description,
              jsonb_build_array(c.image) AS image,
              c."index"
          FROM category c

          LEFT JOIN dictionary d_name_fr
              ON d_name_fr.key = c.name_key AND d_name_fr.lang = 'fr'
          LEFT JOIN dictionary d_name_en
              ON d_name_en.key = c.name_key AND d_name_en.lang = 'en'

          LEFT JOIN dictionary d_description_fr
              ON d_description_fr.key = c.description_key AND d_description_fr.lang = 'fr'
          LEFT JOIN dictionary d_description_en
              ON d_description_en.key = c.description_key AND d_description_en.lang = 'en'

          ORDER BY c."index" ASC;
        `,
        [],
        CacheKeys.CATEGORIES,
        600 // 10 minutes cache for categories
      );
    });
  }

  async findById(id: string): Promise<Category> {
    return this.withPerformanceMonitoring(`findById(${id})`, async () => {
      const category = await this.findById<Category>(
        'category',
        id,
        CacheKeys.CATEGORIES
      );
      
      // Transform the raw data to match Category interface
      return {
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
        index: category.index,
      };
    });
  }

  async create(categoryBody: CategoryBody): Promise<Category> {
    return this.withPerformanceMonitoring('create', async () => {
      const nameKey = uniqueKey();
      const descriptionKey = uniqueKey();

      // Create dictionary entries
      await this.dictionaryService.create({
        key: nameKey,
        translations: categoryBody.name,
      });

      await this.dictionaryService.create({
        key: descriptionKey,
        translations: categoryBody.description,
      });

      // Create category
      const image = await this.imageService.create(categoryBody.image);

      const category = await this.create<CategoryRaw>('category', {
        name_key: nameKey,
        description_key: descriptionKey,
        image: image.id,
        index: categoryBody.index,
      });

      // Invalidate cache
      this.invalidateCacheForEntity(CacheKeys.CATEGORIES);

      return {
        id: category.id,
        name: categoryBody.name,
        description: categoryBody.description,
        image: [image],
        index: category.index,
      };
    });
  }

  async update(id: string, categoryBody: CategoryBody): Promise<Category> {
    return this.withPerformanceMonitoring(`update(${id})`, async () => {
      const category = await this.findById<CategoryRaw>(id);

      // Update dictionary entries
      await this.dictionaryService.update(category.name_key, {
        translations: categoryBody.name,
      });

      await this.dictionaryService.update(category.description_key, {
        translations: categoryBody.description,
      });

      // Update image if provided
      let image = category.image;
      if (categoryBody.image) {
        image = (await this.imageService.update(category.image, categoryBody.image)).id;
      }

      const updatedCategory = await this.update<CategoryRaw>('category', id, {
        index: categoryBody.index,
      });

      // Invalidate cache
      this.invalidateCacheForEntity(CacheKeys.CATEGORIES, id);

      return {
        id: updatedCategory.id,
        name: categoryBody.name,
        description: categoryBody.description,
        image: [image],
        index: updatedCategory.index,
      };
    });
  }

  async delete(id: string): Promise<void> {
    return this.withPerformanceMonitoring(`delete(${id})`, async () => {
      const category = await this.findById<CategoryRaw>(id);

      // Delete related dictionary entries
      await this.dictionaryService.delete(category.name_key);
      await this.dictionaryService.delete(category.description_key);

      // Delete image
      await this.imageService.delete(category.image);

      // Delete category
      await this.delete('category', id);

      // Invalidate cache
      this.invalidateCacheForEntity(CacheKeys.CATEGORIES, id);
    });
  }

  async reorder(ids: string[]): Promise<Category[]> {
    return this.withPerformanceMonitoring('reorder', async () => {
      const transaction = await pool.connect();

      try {
        await transaction.query('BEGIN');

        // Update indexes in transaction
        for (let i = 0; i < ids.length; i++) {
          await transaction.query(
            'UPDATE category SET "index" = $1 WHERE id = $2',
            [i, ids[i]]
          );
        }

        await transaction.query('COMMIT');

        // Invalidate cache
        this.invalidateCacheForEntity(CacheKeys.CATEGORIES);

        // Return reordered categories
        return this.findAll();
      } catch (error) {
        await transaction.query('ROLLBACK');
        logger.error(`Failed to reorder categories: ${error}`);
        throw error;
      } finally {
        transaction.release();
      }
    });
  }
}