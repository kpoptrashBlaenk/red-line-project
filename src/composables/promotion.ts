import { Promotion } from '$/types'
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
  function createPromotionFields() {
    return [
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
      {
        element: 'image',
        name: 'image',
        label: translation('image'),
      },

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
    ] as FormField[]
  }

  /**
   * Flatten promotion to fit into state for forms
   *
   * @param promotion Selected promotion
   */
  function flattenPromotion(promotion: Promotion) {
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
  async function getPromotions() {
    const promotions: Promotion[] = [
      {
        id: 6,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/dfm.png',
        title: {
          en: "Integration of Cyna's 24/7 SOC Solution",
          fr: 'Intégration de la solution SOC 24/7 de Cyna',
        },
        subtitle: {
          en: 'IT Services and Consulting',
          fr: 'Services et conseil en informatique',
        },
        button: {
          en: 'Read the article',
          fr: "Lire l'article",
        },
        link: '/something',
        index: 0,
      },
      {
        id: 1,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/hopital-st-camille.png',
        title: {
          en: 'Implementation of a Managed SOC',
          fr: "Mise en place d'un SOC Managé",
        },
        subtitle: {
          en: 'Hospital Center',
          fr: 'Centre hospitalier',
        },
        button: {
          en: 'Read the article',
          fr: "Lire l'article",
        },
        link: '/something',
        index: 1,
      },
      {
        id: 2,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/Groupe-ABCD.png',
        title: {
          en: 'Cyberattack Incident Response',
          fr: "Réponse à incident d'une cyberattaque",
        },
        subtitle: {
          en: 'Gammist Manufacturer',
          fr: 'Fabricant gammiste',
        },
        button: {
          en: 'Read the article',
          fr: "Lire l'article",
        },
        link: '/something',
        index: 2,
      },
      {
        id: 3,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/07/sincrone-it-logo.png',
        title: {
          en: 'Complete Cybersecurity Supported by 24/7 SOC',
          fr: 'Une cybersécurité complète, portée par le SOC 24/7',
        },
        subtitle: {
          en: 'IT and Telecom Solutions',
          fr: 'Solutions informatiques et télécoms',
        },
        button: {
          en: 'Read the article',
          fr: "Lire l'article",
        },
        link: '/something',
        index: 3,
      },
      {
        id: 4,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/07/logo-actuelburo.png',
        title: {
          en: "Integration of Cyna's 24/7 SOC Offering",
          fr: "Intégration de l'offre SOC 24/7 de Cyna",
        },
        subtitle: {
          en: 'IT Services and Consulting',
          fr: 'Services et conseil en informatique',
        },
        button: {
          en: 'Read the article',
          fr: "Lire l'article",
        },
        link: '/something',
        index: 4,
      },
      {
        id: 5,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/neobrain-1.png',
        title: {
          en: 'Simulation of an Attack (Black & Grey Box)',
          fr: "Simulation d'une attaque (Black & Grey Box)",
        },
        subtitle: {
          en: 'Software Publisher',
          fr: 'Éditeur de logiciels',
        },
        button: {
          en: 'Read the article',
          fr: "Lire l'article",
        },
        link: '/something',
        index: 5,
      },
    ]

    return promotions ?? []
  }

  /**
   * Reorder the promotional products
   *
   * @param items Items in new order
   */
  async function reorderPromotions(items: Promotion[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new promotion
   *
   * @param state The state that tracks the new values
   */
  async function createPromotion(state: PromotionSchema) {
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
  async function modifyPromotion(id: number, state: PromotionSchema) {
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
  async function deletePromotion(id: number) {
    // api request
    id

    await presentToast(translation('toast_deleted'), 'success', checkmarkCircleOutline)
  }

  // return all functions
  return {
    createPromotionFields,
    flattenPromotion,
    getPromotions,
    reorderPromotions,
    createPromotion,
    modifyPromotion,
    deletePromotion,
  }
}
