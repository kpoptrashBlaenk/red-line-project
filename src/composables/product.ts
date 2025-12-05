import { Product } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { ProductSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { useCategory } from './category'

/**
 * Use this composable to do product related queries
 */
export function useProduct() {
  const categoryComposable = useCategory()

  /**
   * Create Product Form Fields
   */
  async function createFields() {
    const formFields: FormField[] = [
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
      },
      {
        element: 'toggle',
        name: 'top',
        label: translation('top'),
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
      category_id: product.category_id,
      top: product.top,
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
        top: true,
        index: 1,
      },
      {
        id: 2,
        category_id: 1,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna SOC Advanced', fr: 'Cyna SOC Avancé' },
        top: false,
        index: 2,
      },
      {
        id: 3,
        category_id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna EDR', fr: 'Cyna EDR' },
        top: true,
        index: 3,
      },
      {
        id: 4,
        category_id: 2,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna EDR Pro', fr: 'Cyna EDR Pro' },
        top: false,
        index: 4,
      },
      {
        id: 5,
        category_id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna XDR', fr: 'Cyna XDR' },
        top: true,
        index: 5,
      },
      {
        id: 6,
        category_id: 3,
        image: 'https://ionicframework.com/docs/img/demos/card-media.png',
        name: { en: 'Cyna XDR Insights', fr: 'Cyna XDR Insights' },
        top: true,
        index: 6,
      },
    ]

    return products ?? []
  }

  /**
   * Get all top products
   */
  async function top() {
    const products: Product[] = (await get()).filter((product) => product.top)

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
    top,
    reorder,
    create,
    modify,
    remove,
  }
}
