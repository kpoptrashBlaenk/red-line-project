import { Product } from '$/types'
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
        label: translation('performance'),
        items: await characteristicComposable.get('performance'),
        itemLabelKey: 'name',
        itemValueKey: 'id',
        multiple: true,
      },
      {
        element: 'select',
        name: 'characteristics_scalability_ids',
        label: translation('scalability'),
        items: await characteristicComposable.get('scalability'),
        itemLabelKey: 'name',
        itemValueKey: 'id',
        multiple: true,
      },
      {
        element: 'select',
        name: 'characteristics_level_ids',
        label: translation('level'),
        items: await characteristicComposable.get('level'),
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
      category_id: product.category_id,
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

      characteristics_performance_ids: product.characteristics_performance_ids,
      characteristics_scalability_ids: product.characteristics_scalability_ids,
      characteristics_level_ids: product.characteristics_level_ids,
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
        image: ['https://ionicframework.com/docs/img/demos/card-media.png'],
        name: { en: 'Cyna SOC', fr: 'Cyna SOC' },
        top: true,
        priority: false,
        price: 120,
        disponible: true,
        index: 1,
        created_at: '2023-05-12T10:15:00Z',
        description_functionality: {
          en: 'Real-time monitoring and incident response for enterprise networks.',
          fr: 'Surveillance en temps réel et réponse aux incidents pour les réseaux d’entreprise.',
        },
        description_advantage: {
          en: 'Reduces risk and ensures compliance with security standards.',
          fr: 'Réduit les risques et assure la conformité avec les standards de sécurité.',
        },
        description_security: {
          en: 'SOC solution with advanced threat detection and 24/7 monitoring.',
          fr: 'Solution SOC avec détection avancée des menaces et surveillance 24/7.',
        },
        characteristics_performance_ids: [1, 2],
        characteristics_scalability_ids: [6],
        characteristics_level_ids: [7],
      },
      {
        id: 2,
        category_id: 1,
        image: ['https://ionicframework.com/docs/img/demos/card-media.png'],
        name: { en: 'Cyna SOC Advanced', fr: 'Cyna SOC Avancé' },
        top: false,
        priority: false,
        price: 200,
        disponible: true,
        index: 2,
        created_at: '2023-11-02T14:45:00Z',
        description_functionality: {
          en: 'Advanced SOC platform with AI-driven threat analysis.',
          fr: 'Plateforme SOC avancée avec analyse des menaces pilotée par IA.',
        },
        description_advantage: {
          en: 'Enhanced automation and faster incident response.',
          fr: 'Automatisation améliorée et réponse aux incidents plus rapide.',
        },
        description_security: {
          en: 'Includes SOC 24/7 monitoring, automated alerts, and detailed reporting.',
          fr: 'Inclut la surveillance SOC 24/7, alertes automatiques et rapports détaillés.',
        },
        characteristics_performance_ids: [2, 3],
        characteristics_scalability_ids: [4, 5],
        characteristics_level_ids: [8],
      },
      {
        id: 3,
        category_id: 2,
        image: ['https://ionicframework.com/docs/img/demos/card-media.png'],
        name: { en: 'Cyna EDR', fr: 'Cyna EDR' },
        top: true,
        priority: false,
        price: 150,
        disponible: true,
        index: 3,
        created_at: '2024-03-18T09:30:00Z',
        description_functionality: {
          en: 'Endpoint detection and response for multi-device environments.',
          fr: 'Détection et réponse aux incidents sur les terminaux multi-appareils.',
        },
        description_advantage: {
          en: 'Improves endpoint security and reduces breach risks.',
          fr: 'Améliore la sécurité des terminaux et réduit les risques de violation.',
        },
        description_security: {
          en: 'EDR solution with AI-based threat hunting and alerting.',
          fr: "Solution EDR avec chasse aux menaces et alertes basées sur l'IA.",
        },
        characteristics_performance_ids: [1, 3],
        characteristics_scalability_ids: [5],
        characteristics_level_ids: [7],
      },
      {
        id: 4,
        category_id: 3,
        image: ['https://ionicframework.com/docs/img/demos/card-media.png'],
        name: { en: 'Cyna XDR', fr: 'Cyna XDR' },
        top: true,
        priority: false,
        price: 250,
        disponible: false,
        index: 4,
        created_at: '2024-07-01T16:20:00Z',
        description_functionality: {
          en: 'Extended detection and response integrating multiple security layers.',
          fr: 'Détection et réponse étendues intégrant plusieurs couches de sécurité.',
        },
        description_advantage: {
          en: 'Centralized threat management across networks, endpoints, and cloud.',
          fr: 'Gestion centralisée des menaces sur les réseaux, terminaux et cloud.',
        },
        description_security: {
          en: 'XDR platform with unified monitoring and proactive threat mitigation.',
          fr: 'Plateforme XDR avec surveillance unifiée et atténuation proactive des menaces.',
        },
        characteristics_performance_ids: [2, 3],
        characteristics_scalability_ids: [5, 6],
        characteristics_level_ids: [8],
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
   * Get all products by category id
   */
  async function category(id: number) {
    const products: Product[] = (await get()).filter((product) => product.category_id === id)

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
    console.log(state)
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
    category,
    reorder,
    create,
    modify,
    remove,
  }
}
