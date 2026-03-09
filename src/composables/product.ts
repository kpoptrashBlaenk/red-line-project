import { CharacteristicType, Product } from '$/types'
import { productsFixtures } from '@/constants/fixtures'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { ProductSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'
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
    const products: Product[] = Object.values(productsFixtures)

    return products ?? []
  }

  /**
   * Get all products by category
   */
  async function getByCategory(categoryId: number) {
    return Object.values(productsFixtures).filter((product) => product.category.id === categoryId)
  }

  /**
   * Find product by id
   */
  async function find(id: number) {
    const product = productsFixtures[id as keyof typeof productsFixtures]

    return product
  }

  /**
   * Get all top products
   */
  async function top() {
    const products: Product[] = Object.values(productsFixtures).filter((product) => product.top)

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
    getByCategory,
    find,
    top,
    reorder,
    create,
    modify,
    remove,
  }
}
