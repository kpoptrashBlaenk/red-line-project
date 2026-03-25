import apiUrl from '$/constants/apiUrl'
import { CharacteristicType, Product } from '$/types'
import { FormField } from '@/types'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { ProductSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { useCategory } from './category'
import { useCharacteristic } from './characteristic'

/**
 * Use this composable to do product related queries
 */
export function useProduct() {
  const categoryComposable = useCategory()
  const characteristicComposable = useCharacteristic()

  /**
   * Create Product Form Fields
   */
  async function createFields() {
    const formFields: FormField[] = [
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
        element: 'textarea',
        name: 'description_functionality_en',
        label: translation('description_functionality'),
      },
      {
        element: 'textarea',
        name: 'description_advantage_en',
        label: translation('description_advantage'),
      },
      {
        element: 'textarea',
        name: 'description_security_en',
        label: translation('description_security'),
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
        element: 'textarea',
        name: 'description_functionality_fr',
        label: translation('description_functionality'),
      },
      {
        element: 'textarea',
        name: 'description_advantage_fr',
        label: translation('description_advantage'),
      },
      {
        element: 'textarea',
        name: 'description_security_fr',
        label: translation('description_security'),
      },

      // general
      {
        element: 'divider',
        label: translation('general'),
      },
      {
        element: 'select',
        name: 'category_id',
        label: translation('category'),
        items: await categoryComposable.get(),
        itemLabelKey: 'name',
        itemValueKey: 'id',
        multiple: false,
      },
      {
        element: 'toggle',
        name: 'top',
        label: translation('top'),
      },
      {
        element: 'toggle',
        name: 'priority',
        label: translation('priority'),
      },
      {
        element: 'input',
        name: 'price',
        label: `${translation('price')} (€)`,
        type: 'number',
      },
      {
        element: 'toggle',
        name: 'disponible',
        label: translation('disponible'),
      },

      // characteristics
      {
        element: 'divider',
        label: translation('characteristics'),
      },
      {
        element: 'select',
        name: 'characteristics_performance_ids',
        label: `${translation('performance')} (${translation('optional')})`,
        items: await characteristicComposable.get(CharacteristicType.performance),
        itemLabelKey: 'name',
        itemValueKey: 'id',
        multiple: true,
      },
      {
        element: 'select',
        name: 'characteristics_scalability_ids',
        label: `${translation('scalability')} (${translation('optional')})`,
        items: await characteristicComposable.get(CharacteristicType.scalability),
        itemLabelKey: 'name',
        itemValueKey: 'id',
        multiple: true,
      },
      {
        element: 'select',
        name: 'characteristics_level_ids',
        label: `${translation('level')} (${translation('optional')})`,
        items: await characteristicComposable.get(CharacteristicType.level),
        itemLabelKey: 'name',
        itemValueKey: 'id',
        multiple: true,
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
        multiple: true,
      },
    ]

    return formFields
  }

  /**
   * Flatten product to fit into state for forms
   *
   * @param product Selected product
   */
  function flatten(product: Product) {
    return {
      category_id: product.category.id,
      top: product.top,
      price: product.price,
      disponible: product.disponible,
      index: product.index,
      priority: product.priority,
      image: product.image,

      name_en: product.name.en,
      name_fr: product.name.fr,

      description_functionality_en: product.description_functionality.en,
      description_functionality_fr: product.description_functionality.fr,
      description_advantage_en: product.description_advantage.en,
      description_advantage_fr: product.description_advantage.fr,
      description_security_en: product.description_security.en,
      description_security_fr: product.description_security.fr,

      characteristics_performance_ids: product.characteristics_performance.map((characteristic) => characteristic.id),
      characteristics_scalability_ids: product.characteristics_scalability.map((characteristic) => characteristic.id),
      characteristics_level_ids: product.characteristics_level.map((characteristic) => characteristic.id),
    }
  }

  /**
   * Get all products
   */
  async function get() {
    try {
      // get products
      const products = await apiGet<Product[]>(apiUrl('product_get_all'))

      // check if empty
      if (!products || products.length === 0) throw new Error(translation('toast_product_none'))

      // return
      return products

      // error
    } catch (error: any) {
      console.error('Error fetching products:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Get all products by category
   */
  async function getByCategory(categoryId: number) {
    try {
      // get products
      const products = await apiGet<Product[]>(apiUrl('product_get_by_category', categoryId))

      // check if empty
      if (!products || products.length === 0) throw new Error(translation('toast_product_none'))

      // return
      return products

      // error
    } catch (error: any) {
      console.error('Error fetching products:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Find product by id
   */
  async function find(id: number) {
    try {
      // get products
      const product = await apiGet<Product>(apiUrl('product_get_by_id', id))

      // check if empty
      if (!product) throw new Error(translation('toast_product_none'))

      // return
      return product

      // error
    } catch (error: any) {
      console.error('Error fetching product:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Get all top products
   */
  async function top() {
    try {
      // get products
      const products = await apiGet<Product[]>(apiUrl('product_get_top'))

      // check if empty
      if (!products || products.length === 0) throw new Error(translation('toast_product_none'))

      // return
      return products

      // error
    } catch (error: any) {
      console.error('Error fetching products:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Reorder the products
   *
   * @param items Items in new order
   */
  async function reorder(items: Product[]) {
    try {
      const ids = items.map((item) => item.id)

      // create promotion
      await apiPut(apiUrl('product_reorder'), ids)

      // toast
      await presentToast(translation('toast_reordered'), 'success')

      // error
    } catch (error: any) {
      console.error('Error reordering product:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create a new product
   *
   * @param state The state that tracks the new values
   */
  async function create(state: ProductSchema) {
    try {
      // use form because image
      const formData = new FormData()

      formData.append('name_en', state.name_en)
      formData.append('name_fr', state.name_fr)
      formData.append('description_functionality_en', state.description_functionality_en)
      formData.append('description_functionality_fr', state.description_functionality_fr)
      formData.append('description_advantage_en', state.description_advantage_en)
      formData.append('description_advantage_fr', state.description_advantage_fr)
      formData.append('description_security_en', state.description_security_en)
      formData.append('description_security_fr', state.description_security_fr)
      formData.append('category_id', String(state.category_id))
      formData.append('top', String(state.top))
      formData.append('priority', String(state.priority))
      formData.append('price', String(state.price))
      formData.append('disponible', String(state.disponible))
      state.characteristics_performance_ids.forEach((id) => formData.append('characteristics_performance_ids', String(id)))
      state.characteristics_scalability_ids.forEach((id) => formData.append('characteristics_scalability_ids', String(id)))
      state.characteristics_level_ids.forEach((id) => formData.append('characteristics_level_ids', String(id)))
      state.image.forEach((file) => formData.append('image', file as File))
      formData.append('first', 'multer')

      // create product
      await apiPost(apiUrl('product_create'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // toast
      await presentToast(translation('toast_added'), 'success')

      // error
    } catch (error: any) {
      console.error('Error fetching products:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Modify a product
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: ProductSchema) {
    try {
      const formData = new FormData()

      formData.append('name_en', state.name_en)
      formData.append('name_fr', state.name_fr)
      formData.append('description_functionality_en', state.description_functionality_en)
      formData.append('description_functionality_fr', state.description_functionality_fr)
      formData.append('description_advantage_en', state.description_advantage_en)
      formData.append('description_advantage_fr', state.description_advantage_fr)
      formData.append('description_security_en', state.description_security_en)
      formData.append('description_security_fr', state.description_security_fr)
      formData.append('category_id', String(state.category_id))
      formData.append('top', String(state.top))
      formData.append('priority', String(state.priority))
      formData.append('price', String(state.price))
      formData.append('disponible', String(state.disponible))
      state.characteristics_performance_ids.forEach((id) => formData.append('characteristics_performance_ids', String(id)))
      state.characteristics_scalability_ids.forEach((id) => formData.append('characteristics_scalability_ids', String(id)))
      state.characteristics_level_ids.forEach((id) => formData.append('characteristics_level_ids', String(id)))
      state.image.forEach((file) => formData.append('image', file as any))
      formData.append('first', typeof state.image[0] === 'string' ? 'body' : 'multer')

      await apiPut(apiUrl('product_update', id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      await presentToast(translation('toast_modified'), 'success')

      // error
    } catch (error: any) {
      console.error('Error updating product:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Delete a product
   *
   * @param id The id of the product record
   */
  async function remove(id: number) {
    try {
      // create product
      await apiDelete(apiUrl('product_delete', id))

      // toast
      await presentToast(translation('toast_deleted'), 'success')

      // error
    } catch (error: any) {
      console.error('Error deleting product:', error)
      await presentToast(error.message, 'danger')
    }
  }

  // return all functions
  return {
    createFields,
    flatten,
    get,
    getByCategory,
    find,
    top,
    reorder,
    create,
    modify,
    remove,
  }
}
