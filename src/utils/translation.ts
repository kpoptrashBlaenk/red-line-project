import { useSettingsStore } from '@/stores/settings'
import { Language, TranslationKey } from '@/types'

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    menu: 'Menu',
    home: 'Home',
    legal_mentions: 'Legal Mentions',
    general_conditions: 'General Conditions',
  },
  fr: {
    menu: 'Menu',
    home: 'Accueil',
    legal_mentions: 'Mentions légales',
    general_conditions: 'Conditions générales',
  },
}

export default function (key: TranslationKey) {
  const setttingsStore = useSettingsStore()

  return translations[setttingsStore.getLanguage][key]
}
