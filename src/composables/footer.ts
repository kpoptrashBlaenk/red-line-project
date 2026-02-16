import { Social } from '$/types'
import { socialFixtures } from '@/constants/fixtures'

/**
 * Use this composable to do footer related queries
 */
export function useFooter() {
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
    const text: string =
      'Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we prioritize expertise, proximity, and speed of execution.'

    return text ?? ''
  }

  // return all functions
  return { getSocials, getInfoText }
}
