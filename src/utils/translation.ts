import translations from '@/constants/translations'
import { useSettingsStore } from '@/stores/settings'
import { TranslationKey } from '@/types'

export default function (key: TranslationKey) {
  const setttingsStore = useSettingsStore()

  return translations[setttingsStore.getLanguage][key]
}
