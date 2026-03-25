import apiUrl from '$/constants/apiUrl'
import { Promotion } from '$/types'
import { FormField } from '@/types'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { PromotionSchema } from '@/utils/schemas'
import translation from '@/utils/translation'

/**
 * Use this composable to do promotion related queries
 */
export function usePromotion() {
  /**
   * Create Promotional Form Fields
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
        name: 'title_en',
        label: translation('title'),
      },
      {
        element: 'input',
        name: 'subtitle_en',
        label: translation('subtitle'),
      },
      {
        element: 'input',
        name: 'button_en',
        label: translation('button_text'),
      },

      // fr
      {
        element: 'divider',
        label: translation('french'),
      },
      {
        element: 'input',
        name: 'title_fr',
        label: translation('title'),
      },
      {
        element: 'input',
        name: 'subtitle_fr',
        label: translation('subtitle'),
      },
      {
        element: 'input',
        name: 'button_fr',
        label: translation('button_text'),
      },

      // general
      {
        element: 'divider',
        label: translation('general'),
      },
      {
        element: 'input',
        name: 'link',
        label: translation('link'),
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
   * Flatten promotion to fit into state for forms
   *
   * @param promotion Selected promotion
   */
  function flatten(promotion: Promotion) {
    return {
      title_en: promotion.title.en,
      title_fr: promotion.title.fr,
      subtitle_en: promotion.subtitle.en,
      subtitle_fr: promotion.subtitle.fr,
      button_en: promotion.button.en,
      button_fr: promotion.button.fr,
      link: promotion.link,
      image: promotion.image,
    }
  }

  /**
   * Get the promotional products
   */
  async function get() {
    try {
      // get promotions
      const promotions = await apiGet<Promotion[]>(apiUrl('promotion_get_all'))

      // check if empty
      if (!promotions || promotions.length === 0) throw new Error(translation('toast_promotion_none'))

      // return
      return promotions

      // error
    } catch (error: any) {
      console.error('Error fetching promotions:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Reorder the promotional products
   *
   * @param items Items in new order
   */
  async function reorder(items: Promotion[]) {
    try {
      const ids = items.map((item) => item.id)

      // create promotion
      await apiPut(apiUrl('promotion_reorder'), ids)

      // toast
      await presentToast(translation('toast_reordered'), 'success')

      // error
    } catch (error: any) {
      console.error('Error reordering promotions:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Create a new promotion
   *
   * @param state The state that tracks the new values
   */
  async function create(state: PromotionSchema) {
    try {
      // use form because image
      const formData = new FormData()

      formData.append('link', state.link)
      formData.append('title_en', state.title_en)
      formData.append('title_fr', state.title_fr)
      formData.append('subtitle_en', state.subtitle_en)
      formData.append('subtitle_fr', state.subtitle_fr)
      formData.append('button_en', state.button_en)
      formData.append('button_fr', state.button_fr)
      state.image.forEach((file) => {
        formData.append('image', file)
      })

      // create promotion
      await apiPost(apiUrl('promotion_create'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // toast
      await presentToast(translation('toast_added'), 'success')

      // error
    } catch (error: any) {
      console.error('Error fetching promotions:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Modify a promotion
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: PromotionSchema) {
    try {
      // use form because image
      const formData = new FormData()

      formData.append('link', state.link)
      formData.append('title_en', state.title_en)
      formData.append('title_fr', state.title_fr)
      formData.append('subtitle_en', state.subtitle_en)
      formData.append('subtitle_fr', state.subtitle_fr)
      formData.append('button_en', state.button_en)
      formData.append('button_fr', state.button_fr)
      state.image.forEach((file) => {
        formData.append('image', file)
      })

      // create promotion
      await apiPut(apiUrl('promotion_update', id), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // toast
      await presentToast(translation('toast_modified'), 'success')

      // error
    } catch (error: any) {
      console.error('Error updating promotion:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Delete a promotion
   *
   * @param id The id of the promotion record
   */
  async function remove(id: number) {
    try {
      // create promotion
      await apiDelete(apiUrl('promotion_update', id))

      // toast
      await presentToast(translation('toast_deleted'), 'success')

      // error
    } catch (error: any) {
      console.error('Error deleting promotion:', error)
      await presentToast(error.message, 'danger')
    }
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
