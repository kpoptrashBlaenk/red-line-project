import { Social } from '$/types'
import { logoGithub } from 'ionicons/icons'

/**
 * Use this composable to do footer related queries
 */
export function useFooter() {
  /**
   * Get the Cyna social links for the footer
   */
  async function getSocials() {
    const socials: Social[] = [
      {
        id: 1,
        logo: logoGithub,
        link: 'https://github.com/kpoptrashBlaenk',
      },
    ]

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
