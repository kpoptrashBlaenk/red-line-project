import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'

const translationKeys = {
  menu: 'menu',
  home: 'home',
  legal_mentions: 'legal_mentions',
  general_conditions: 'general_conditions',
  contact: 'contact',
}

export type TranslationKey = keyof typeof translationKeys

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    menu: 'Menu',
    home: 'Home',
    legal_mentions: 'Legal Mentions',
    general_conditions: 'General Conditions',
    contact: 'Contact',
  },
  fr: {
    menu: 'Menu',
    home: 'Accueil',
    legal_mentions: 'Mentions légales',
    general_conditions: 'Conditions générales',
    contact: 'Contacte',
  },
}

export default function (key: TranslationKey) {
  const setttingsStore = useSettingsStore()

  return translations[setttingsStore.getLanguage][key]
}
