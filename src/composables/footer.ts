/**
 * Use this composable to do footer related queries
 */
export function useFooter() {
  /**
   * Get the Cyna info text for the footer
   */
  async function infoText() {
    // const text = await apiGet<string>(`${apiUrls.footer_info_text}?lang=${settingsStore.getLanguage}`)
    const text =
      'Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we prioritize expertise, proximity, and speed of execution.'

    return text ?? ''
  }

  // return all functions
  return { infoText }
}
