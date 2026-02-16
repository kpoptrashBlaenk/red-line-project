import { HomeText } from '$/types'
import { homeTextFixtures } from '@/constants/fixtures'
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
    const homeText: HomeText[] = Object.values(homeTextFixtures)

    return homeText ?? []
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

  // return all functions
  return {
    createFields,
    flatten,
    get,
    modify,
  }
}
