import { Social } from '$/types'
import { socialFixtures } from '@/constants/fixtures'
import { useSettingsStore } from '@/stores/settings'

/**
 * Use this composable to do footer related queries
 */
export function useFooter() {
  const settingsStore = useSettingsStore()

  /**
   * Get the Cyna social links for the footer
   */
  async function getSocials() {
    const socials: Social[] = Object.values(socialFixtures)

    return socials ?? []
  }

  /**
   * Get the Cyna info text for the footer
   */
  async function getInfoText() {
    const text = {
      en: 'Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we prioritize expertise, proximity, and speed of execution.',
      fr: "Cyna est un acteur pur de la cybersécurité pour les PME et les MSP. La qualité du service est au cœur de notre activité, où nous privilégions l'expertise, la proximité et la rapidité d'exécution.",
    }

    return text
  }

  /**
   * Get the legal mentions
   */
  async function getLegalMentions() {
    const response = await fetch(`/legal/legal_mentions.${settingsStore.getLanguage}.txt`)

    return await response.text()
  }

  /**
   * Get the general conditions
   */
  async function getGeneralConditions() {
    const response = await fetch(`/legal/general_conditions.${settingsStore.getLanguage}.txt`)

    return await response.text()
  }

  // return all functions
  return { getSocials, getInfoText, getLegalMentions, getGeneralConditions }
}
