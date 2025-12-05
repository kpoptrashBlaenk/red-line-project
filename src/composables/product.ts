import { Product } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { ProductSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do product related queries
 */
export function useProduct() {
  /**
   * Create Product Form Fields
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
   * Flatten product to fit into state for forms
   *
   * @param product Selected product
   */
  function flatten(product: Product) {
    return {
      name_en: product.name.en,
      name_fr: product.name.fr,
      image: product.image,
    }
  }

  /**
   * Get all products
   */
  async function get() {
    const products: Product[] = [
      {
        id: 1,
        category_id: 1,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna SOC', fr: 'Cyna SOC' },
        index: 1,
      },
      {
        id: 2,
        category_id: 1,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna SOC Advanced', fr: 'Cyna SOC Avancé' },
        index: 2,
      },
      {
        id: 3,
        category_id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna EDR', fr: 'Cyna EDR' },
        index: 1,
      },
      {
        id: 4,
        category_id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna EDR Pro', fr: 'Cyna EDR Pro' },
        index: 2,
      },
      {
        id: 5,
        category_id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna XDR', fr: 'Cyna XDR' },
        index: 1,
      },
      {
        id: 6,
        category_id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna XDR Insights', fr: 'Cyna XDR Insights' },
        index: 2,
      },
    ]

    return products ?? []
  }

  /**
   * Reorder the products
   *
   * @param items Items in new order
   */
  async function reorder(items: Product[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new product
   *
   * @param state The state that tracks the new values
   */
  async function create(state: ProductSchema) {
    // api request
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a product
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: ProductSchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a product
   *
   * @param id The id of the product record
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
    reorder,
    create,
    modify,
    remove,
  }
}
