import { Category } from '$/types'
import { FormField } from '@/types'
import { apiPost } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { CategorySchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { categoryFixtures } from './../constants/fixtures'

/**
 * Use this composable to do category related queries
 */
export function useCategory() {
  /**
   * Create Category Form Fields
   */
  function createFields() {
    return [
      // en
      {
        element: 'divider',
        label: translation('english'),
      },
      {
        element: 'input',
        name: 'name_en',
        label: translation('name'),
      },
      {
        element: 'input',
        name: 'description_en',
        label: translation('description'),
      },

      // fr
      {
        element: 'divider',
        label: translation('french'),
      },
      {
        element: 'input',
        name: 'name_fr',
        label: translation('name'),
      },
      {
        element: 'input',
        name: 'description_fr',
        label: translation('description'),
      },

      // image
      {
        element: 'divider',
        label: translation('image'),
      },
      {
        element: 'image',
        name: 'image',
        label: translation('upload'),
      },
    ] as FormField[]
  }

  /**
   * Flatten category to fit into state for forms
   *
   * @param category Selected category
   */
  function flatten(category: Category) {
    return {
      name_en: category.name.en,
      name_fr: category.name.fr,
      description_en: category.description.en,
      description_fr: category.description.fr,
      image: category.image,
    }
  }

  /**
   * Get all categories
   */
  async function get() {
    const categories: Category[] = Object.values(categoryFixtures)

    return categories ?? []
  }

  /**
   * Find category by id
   */
  async function find(id: number) {
    const category = categoryFixtures[id as keyof typeof categoryFixtures]

    return category
  }

  /**
   * Reorder the categories
   *
   * @param items Items in new order
   */
  async function reorder(items: Category[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new category
   *
   * @param state The state that tracks the new values
   */
  async function create(state: CategorySchema) {
    try {
      // create promotion
      const response = await apiPost<Category>('/api/promotion', state)

      // check response
      if (!response) {
        throw new Error(translation('error_category_post_500'))
      }

      // success
      await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)

      // catch
    } catch (error: any) {
      await presentToast(error.message, 'danger', alertCircleOutline)
    }
  }

  /**
   * Modify a category
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: CategorySchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a category
   *
   * @param id The id of the category record
   */
  async function remove(id: number) {
    // api request
    id

    await presentToast(translation('toast_deleted'), 'success', checkmarkCircleOutline)
  }

  // return all functions
  return {
    createFields,
    flatten,
    get,
    find,
    reorder,
    create,
    modify,
    remove,
  }
}
