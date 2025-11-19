import { Language, TranslationKey } from '@/types'

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    home: 'Home',
    legal_mentions: 'Legal Mentions',
    general_conditions: 'General Conditions',
  },
  fr: {
    home: 'Accueil',
    legal_mentions: 'Mentions légales',
    general_conditions: 'Conditions générales',
  },
}

export default translations
