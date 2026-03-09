import { Promotion } from '$/types'
import { promotionFixtures } from '@/constants/fixtures'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { PromotionSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

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
    const promotions: Promotion[] = Object.values(promotionFixtures)

    return promotions ?? []
  }

  /**
   * Reorder the promotional products
   *
   * @param items Items in new order
   */
  async function reorder(items: Promotion[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new promotion
   *
   * @param state The state that tracks the new values
   */
  async function create(state: PromotionSchema) {
    // api request
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a promotion
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: PromotionSchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a promotion
   *
   * @param id The id of the promotion record
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
