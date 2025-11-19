import translations from '@/constants/translations'
import { useSettingsStore } from '@/stores/settings'
import { TranslationKey } from '@/types'

/**
 * Use this composable to do settings related queries
 */
export function useSettings() {
  const settingsStore = useSettingsStore()

  /**
   * Translate static words using the translations constant
   *
   * @param key Key of word to translate
   */
  function translate(key: TranslationKey) {
    return translations[settingsStore.getLanguage][key]
  }

  // return all functions
  return { translate }
}
