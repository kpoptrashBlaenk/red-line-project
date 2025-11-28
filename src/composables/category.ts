import { Category } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { CategorySchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do category related queries
 */
export function useCategory() {
  /**
   * Create Category Form Fields
   */
  function createCategoryFields() {
    return [
      // general
      {
        element: 'divider',
        label: translation('general'),
      },
      {
        element: 'image',
        name: 'image',
        label: translation('image'),
      },

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
    ] as FormField[]
  }

  /**
   * Flatten category to fit into state for forms
   *
   * @param category Selected category
   */
  function flattenCategory(category: Category) {
    return {
      name_en: category.name.en,
      name_fr: category.name.fr,
      image: category.image,
    }
  }

  /**
   * Get all categories
   */
  async function getCategories() {
    const categories: Category[] = [
      {
        id: 1,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Technology',
          fr: 'Technologie',
        },
        index: 0,
      },
      {
        id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Health',
          fr: 'Santé',
        },
        index: 1,
      },
      {
        id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Travel',
          fr: 'Voyage',
        },
        index: 2,
      },
      {
        id: 4,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Food',
          fr: 'Alimentation',
        },
        index: 3,
      },
      {
        id: 5,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Education',
          fr: 'Éducation',
        },
        index: 4,
      },
      {
        id: 6,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: {
          en: 'Sports',
          fr: 'Sports',
        },
        index: 5,
      },
    ]

    return categories ?? []
  }

  /**
   * Reorder the categories
   *
   * @param items Items in new order
   */
  async function reorderCategories(items: Category[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new category
   *
   * @param state The state that tracks the new values
   */
  async function createCategory(state: CategorySchema) {
    // api request
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a category
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modifyCategory(id: number, state: CategorySchema) {
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
  async function deleteCategory(id: number) {
    // api request
    id

    await presentToast(translation('toast_deleted'), 'success', checkmarkCircleOutline)
  }

  // return all functions
  return {
    createCategoryFields,
    flattenCategory,
    getCategories,
    reorderCategories,
    createCategory,
    modifyCategory,
    deleteCategory,
  }
}
