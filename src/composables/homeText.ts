import { HomeText } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { HomeTextSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do homeText related queries
 */
export function useHomeText() {
  /**
   * Create Home Text Form Fields
   */
  function createFields() {
    return [
      // en
      {
        element: 'divider',
        label: translation('english'),
      },
      {
        element: 'textarea',
        name: 'text_en',
        label: translation('text'),
      },

      // fr
      {
        element: 'divider',
        label: translation('french'),
      },
      {
        element: 'textarea',
        name: 'text_fr',
        label: translation('text'),
      },
    ] as FormField[]
  }

  /**
   * Flatten home text to fit into state for forms
   *
   * @param homeText Selected homeText
   */
  function flatten(homeText: HomeText) {
    return {
      text_en: homeText.text.en,
      text_fr: homeText.text.fr,
    }
  }

  /**
   * Get all home texts
   */
  async function get() {
    const homeText: HomeText[] = [
      {
        text: {
          en: 'Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we prioritize expertise, proximity, and speed of execution.',
          fr: "Cyna est un acteur pur de la cybersécurité pour les PME et les MSP. La qualité de service est au cœur de notre activité, où nous privilégions l'expertise, la proximité et la rapidité d'exécution.",
        },
      },
    ]

    return homeText ?? []
  }

  /**
   * Reorder the home text
   *
   * @param items Items in new order
   */
  async function reorder(items: HomeText[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new home text
   *
   * @param state The state that tracks the new values
   */
  async function create(state: HomeTextSchema) {
    // api request
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a home text
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: HomeTextSchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a homeText
   *
   * @param id The id of the home text record
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
