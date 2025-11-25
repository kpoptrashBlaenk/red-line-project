/**
 * Use this composable to do home text related queries
 */
export function useHomeText() {
  /**
   * Get the info text for the home page
   */
  async function getHomeText() {
    const text: string =
      'Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we prioritize expertise, proximity, and speed of execution.'

    return text ?? ''
  }

  // return all functions
  return { getHomeText }
}
