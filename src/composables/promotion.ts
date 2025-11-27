import { Promotion } from '$/types'
import presentToast from '@/utils/presentToast'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do promotion related queries
 */
export function usePromotion() {
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
   */
  async function reorderPromotions(items: Promotion[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)

    return
  }

  // return all functions
  return { getPromotions, reorderPromotions }
}
