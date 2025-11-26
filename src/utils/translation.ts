import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import totTitle from './totTitle'

const translationKeys = {
  menu: 'menu',
  home: 'home',
  legal_mentions: 'legal_mentions',
  general_conditions: 'general_conditions',
  contact: 'contact',
  admin: 'admin',
  home_carousel_title: 'home_carousel_title',
  home_category_title: 'home_category_title',
  category: 'category',
  admin_home_carousel_title: 'admin_home_carousel_title',
  toast_reordered: 'toast_reorder',
  add: 'add',
}

export type TranslationKey = keyof typeof translationKeys

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    menu: 'Menu',
    home: 'Home',
    legal_mentions: 'Legal Mentions',
    general_conditions: 'General Conditions',
    contact: 'Contact',
    admin: 'Admin Access',
    home_carousel_title: 'Our Promotions',
    home_category_title: `Explore Our ${totTitle('Categories')}`,
    category: 'Category',
    admin_home_carousel_title: 'Promotion Carousel',
    toast_reordered: 'Items reordered',
    add: 'Add',
  },
  fr: {
    menu: 'Menu',
    home: 'Accueil',
    legal_mentions: 'Mentions légales',
    general_conditions: 'Conditions générales',
    contact: 'Contacte',
    admin: 'Accès Admin',
    home_carousel_title: 'Nos Promotions',
    home_category_title: `Découvrez nos ${totTitle('catégories')}`,
    category: 'Catégorie',
    admin_home_carousel_title: 'Carrousel de promotions',
    toast_reordered: 'Items reordered',
    add: 'Ajouter',
  },
}

/**
 * Translate static text in the selected app language
 *
 * @param key
 */
export default function (key: TranslationKey) {
  const setttingsStore = useSettingsStore()

  return translations[setttingsStore.getLanguage][key]
}
