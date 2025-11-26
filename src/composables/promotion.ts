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
        id: 1,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/hopital-st-camille.png',
        title: "Mise en place d'un SOC Managé",
        subtitle: 'Centre hospitalier',
        button: "Lire l'article",
        link: '/something',
        index: 1,
      },
      {
        id: 2,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/Groupe-ABCD.png',
        title: "Réponse à incident d'une cyberattaque",
        subtitle: 'Fabricant gammiste',
        button: "Lire l'article",
        link: '/something',
        index: 2,
      },
      {
        id: 3,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/07/sincrone-it-logo.png',
        title: 'Une cybersécurité complète, portée par le SOC 24/7',
        subtitle: 'Solutions informatiques et télécoms',
        button: "Lire l'article",
        link: '/something',
        index: 3,
      },
      {
        id: 4,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/07/logo-actuelburo.png',
        title: "Intégration de l'offre SOC 24/7 de Cyna",
        subtitle: 'Services et conseil en informatique',
        button: "Lire l'article",
        link: '/something',
        index: 4,
      },
      {
        id: 5,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/neobrain-1.png',
        title: "Simulation d'une attaque (Black & Grey Box)",
        subtitle: 'Éditeur de logiciels',
        button: "Lire l'article",
        link: '/something',
        index: 5,
      },
      {
        id: 6,
        image: 'https://cyna-it.fr/wp-content/uploads/2025/01/dfm.png',
        title: 'Intégration de la solution SOC 24/7 de Cyna',
        subtitle: 'Services et conseil en informatique',
        button: "Lire l'article",
        link: '/something',
        index: 6,
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
