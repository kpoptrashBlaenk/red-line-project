import { CategoryBody } from '$/types';
import { Request, Response } from 'express';
import { CategoryServiceImproved } from '../service/category.service.improved';
import { ErrorMiddleware } from '../middleware/error.middleware';
import { logger } from '#/utils/logger';

export default class CategoryControllerImproved {
  private categoryService: CategoryServiceImproved;

  constructor() {
    this.categoryService = new CategoryServiceImproved();
  }

  getAll = ErrorMiddleware.asyncHandler(async (req: Request, res: Response) => {
    req.logger?.info('Fetching all categories');
    
    const categories = await this.categoryService.findAll();
    
    req.logger?.info(`Returning ${categories.length} categories`);
    
    return res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
    });
  });

  getById = ErrorMiddleware.asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    req.logger?.info(`Fetching category with ID: ${id}`);
    
    const category = await this.categoryService.findById(id);
    
    req.logger?.info(`Category found: ${category.name.en || category.name.fr}`);
    
    return res.status(200).json({
      success: true,
      data: category,
    });
  });

  create = ErrorMiddleware.asyncHandler(async (req: Request, res: Response) => {
    req.logger?.info('Creating new category');
    
    const categoryBody: CategoryBody = req.body;
    const createdCategory = await this.categoryService.create(categoryBody);
    
    req.logger?.info(`Category created with ID: ${createdCategory.id}`);
    
    return res.status(201).json({
      success: true,
      data: createdCategory,
      message: 'Category created successfully',
    });
  });

  update = ErrorMiddleware.asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const categoryBody: CategoryBody = req.body;
    
    req.logger?.info(`Updating category with ID: ${id}`);
    
    const updatedCategory = await this.categoryService.update(id, categoryBody);
    
    req.logger?.info(`Category updated: ${updatedCategory.name.en || updatedCategory.name.fr}`);
    
    return res.status(200).json({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully',
    });
  });

  delete = ErrorMiddleware.asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    
    req.logger?.info(`Deleting category with ID: ${id}`);
    
    await this.categoryService.delete(id);
    
    req.logger?.info(`Category deleted successfully`);
    
    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  });

  reorder = ErrorMiddleware.asyncHandler(async (req: Request, res: Response) => {
    const { ids } = req.body;
    
    req.logger?.info(`Reordering ${ids.length} categories`);
    
    const reorderedCategories = await this.categoryService.reorder(ids);
    
    req.logger?.info('Categories reordered successfully');
    
    return res.status(200).json({
      success: true,
      data: reorderedCategories,
      message: 'Categories reordered successfully',
    });
  });
}