import { LanguageRecord } from '$/types'
import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import totTitle from './totTitle'

const translationKeys = {
  add: 'add',
  add_promotion: 'add_promotion',
  admin: 'admin',
  admin_home_carousel_title: 'admin_home_carousel_title',
  button_text: 'promotion_button',
  cancel: 'cancel',
  category: 'category',
  contact: 'contact',
  english: 'english',
  error_required: 'error_required',
  french: 'french',
  general: 'general',
  general_conditions: 'general_conditions',
  home: 'home',
  home_carousel_title: 'home_carousel_title',
  home_category_title: 'home_category_title',
  legal_mentions: 'legal_mentions',
  link: 'promotion_link',
  menu: 'menu',
  submit: 'submit',
  subtitle: 'promotion_subtitle',
  title: 'promotion_title',
  toast_reordered: 'toast_reordered',
  toast_added: 'toast_added',
}

export type TranslationKey = keyof typeof translationKeys

const translations: Record<TranslationKey, Record<Language, string>> = {
  add: {
    en: 'Add',
    fr: 'Ajouter',
  },
  add_promotion: {
    en: 'Add a new Promotion',
    fr: 'Ajouter une nouvelle promotion',
  },
  admin: {
    en: 'Admin Access',
    fr: 'Accès Admin',
  },
  admin_home_carousel_title: {
    en: 'Promotion Carousel',
    fr: 'Carrousel de promotions',
  },
  button_text: {
    en: 'Button text',
    fr: 'Texte du bouton',
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler',
  },
  category: {
    en: 'Category',
    fr: 'Catégorie',
  },
  contact: {
    en: 'Contact',
    fr: 'Contacte',
  },
  english: {
    en: 'English',
    fr: 'Anglais',
  },
  error_required: {
    en: 'Please fill out this field',
    fr: 'Veuillez remplir ce champ',
  },
  french: {
    en: 'French',
    fr: 'Français',
  },
  general: {
    en: 'General',
    fr: 'Général',
  },
  general_conditions: {
    en: 'General Conditions',
    fr: 'Conditions générales',
  },
  home: {
    en: 'Home',
    fr: 'Accueil',
  },
  home_carousel_title: {
    en: 'Our Promotions',
    fr: 'Nos Promotions',
  },
  home_category_title: {
    en: `Explore Our ${totTitle('Categories')}`,
    fr: `Découvrez nos ${totTitle('catégories')}`,
  },
  link: {
    en: 'Link',
    fr: 'Lien',
  },
  legal_mentions: {
    en: 'Legal Mentions',
    fr: 'Mentions légales',
  },
  menu: {
    en: 'Menu',
    fr: 'Menu',
  },
  submit: {
    en: 'Submit',
    fr: 'Envoyer',
  },
  subtitle: {
    en: 'Subtitle',
    fr: 'Sous-titre',
  },
  title: {
    en: 'Title',
    fr: 'Titre',
  },
  toast_reordered: {
    en: 'Items reordered',
    fr: 'Éléments réordonnés',
  },
  toast_added: {
    en: 'Successfully added',
    fr: 'Ajouté avec succès',
  },
}

/**
 * Translate static text in the selected app language.
 * If none is found, then return the transltion of the record
 *
 * @param record Translation key or an entire language record
 */
export default function (record: TranslationKey | LanguageRecord) {
  const setttingsStore = useSettingsStore()

  if (typeof record === 'string') {
    return translations[record][setttingsStore.getLanguage]
  }

  return record[setttingsStore.getLanguage]
}
