import apiUrl from '$/constants/apiUrl'
import { Category } from '$/types'
import { FormField } from '@/types'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { CategorySchema } from '@/utils/schemas'
import translation from '@/utils/translation'

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
    try {
      // get categories
      const categories = await apiGet<Category[]>(apiUrl('category_get_all'))

      // check if empty
      if (!categories || categories.length === 0) throw new Error(translation('toast_category_none'))

      // return
      return categories

      // error
    } catch (error: any) {
      console.error('Error fetching categories:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Find category by id
   */
  async function find(id: number) {
    try {
      // get categories
      const categories = await apiGet<Category[]>(apiUrl('category_get_by_id', id))

      // check if empty
      if (!categories || categories.length === 0) throw new Error(translation('toast_category_none'))

      // return
      return categories

      // error
    } catch (error: any) {
      console.error('Error fetching category:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Reorder the categories
   *
   * @param items Items in new order
   */
  async function reorder(items: Category[]) {
    try {
      const ids = items.map((item) => item.id)

      // create promotion
      await apiPut(apiUrl('category_reorder'), ids)

      // toast
      await presentToast(translation('toast_reordered'), 'success')

      // error
    } catch (error: any) {
      console.error('Error reordering category:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create a new category
   *
   * @param state The state that tracks the new values
   */
  async function create(state: CategorySchema) {
    try {
      // use form because image
      const formData = new FormData()

      formData.append('name_en', state.name_en)
      formData.append('name_fr', state.name_fr)
      formData.append('description_en', state.description_en)
      formData.append('description_fr', state.description_fr)
      state.image.forEach((file) => {
        formData.append('image', file)
      })

      // create category
      await apiPost(apiUrl('category_create'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // toast
      await presentToast(translation('toast_added'), 'success')

      // error
    } catch (error: any) {
      console.error('Error fetching categories:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Modify a category
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: CategorySchema) {
    try {
      // use form because image
      const formData = new FormData()

      formData.append('name_en', state.name_en)
      formData.append('name_fr', state.name_fr)
      formData.append('description_en', state.description_en)
      formData.append('description_fr', state.description_fr)
      state.image.forEach((file) => {
        formData.append('image', file)
      })

      // create category
      await apiPut(apiUrl('category_update', id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // toast
      await presentToast(translation('toast_modified'), 'success')

      // error
    } catch (error: any) {
      console.error('Error updating category:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Delete a category
   *
   * @param id The id of the category record
   */
  async function remove(id: number) {
    try {
      // create category
      await apiDelete(apiUrl('category_update', id))

      // toast
      await presentToast(translation('toast_deleted'), 'success')

      // error
    } catch (error: any) {
      console.error('Error deleting category:', error)
      await presentToast(error.message, 'danger')
    }
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
