import apiUrl from '$/constants/apiUrl'
import { HomeText } from '$/types'
import { FormField } from '@/types'
import { apiGet, apiPut } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { HomeTextSchema } from '@/utils/schemas'
import translation from '@/utils/translation'

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
    try {
      // get home text
      const homeTexts = await apiGet<HomeText[]>(apiUrl('home_text_get_all'))

      // check if empty
      if (!homeTexts || homeTexts.length === 0) throw new Error(translation('toast_home_text_none'))

      // return
      return homeTexts

      // error
    } catch (error: any) {
      console.error('Error fetching home text:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Modify a home text
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: HomeTextSchema) {
    try {
      // create promotion
      await apiPut(apiUrl('home_text_update', id), state)

      // toast
      await presentToast(translation('toast_modified'), 'success')

      // error
    } catch (error: any) {
      console.error('Error updating home text:', error)
      await presentToast(error.message, 'danger')
    }
  }

  // return all functions
  return {
    createFields,
    flatten,
    get,
    modify,
  }
}
