import { LanguageRecord } from '$/types'
import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import totTitle from './totTitle'

const translationKeys = {
  add: 'add',
  admin: 'admin',
  admin_home_category_title: 'admin_category_title',
  admin_home_carousel_title: 'admin_home_carousel_title',
  admin_home_text_title: 'admin_home_carousel_title',
  alert_header: 'alert_header',
  alert_message: 'alert_message',
  button_text: 'promotion_button',
  cancel: 'cancel',
  category: 'category',
  contact: 'contact',
  delete: 'delete',
  details: 'details',
  english: 'english',
  error_required: 'error_required',
  file_too_big: 'file_too_big',
  french: 'french',
  general: 'general',
  general_conditions: 'general_conditions',
  home: 'home',
  home_carousel_title: 'home_carousel_title',
  home_category_title: 'home_category_title',
  image: 'image',
  legal_mentions: 'legal_mentions',
  link: 'promotion_link',
  menu: 'menu',
  name: 'name',
  no_file: 'no_file',
  not_an_image: 'not_an_image',
  pages: 'pages',
  submit: 'submit',
  subtitle: 'promotion_subtitle',
  text: 'text',
  title: 'promotion_title',
  toast_added: 'toast_added',
  toast_deleted: 'toast_deleted',
  toast_modified: 'toast_modified',
  toast_reordered: 'toast_reordered',
  upload: 'upload',
}

export type TranslationKey = keyof typeof translationKeys

const translations: Record<TranslationKey, Record<Language, string>> = {
  add: {
    en: 'Add',
    fr: 'Ajouter',
  },
  admin: {
    en: 'Admin Access',
    fr: 'Accès Admin',
  },
  admin_home_category_title: {
    en: 'Home Categories',
    fr: "Catégories d'accueil",
  },
  admin_home_carousel_title: {
    en: 'Home Promotion Carousel',
    fr: "Carrousel de promotions d'accueil",
  },
  admin_home_text_title: {
    en: 'Home Text Box',
    fr: "Boîte de texte d'accueil",
  },
  alert_header: {
    en: 'Are you sure?',
    fr: 'Êtes-vous sûr?',
  },
  alert_message: {
    en: 'This action cannot be undone.',
    fr: 'Cette action est irréversible.',
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
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
  },
  details: {
    en: 'Details',
    fr: 'Détails',
  },
  english: {
    en: 'English',
    fr: 'Anglais',
  },
  error_required: {
    en: 'Please fill out this field',
    fr: 'Veuillez remplir ce champ',
  },
  file_too_big: {
    en: 'The selected file is too large',
    fr: 'Le fichier sélectionné est trop volumineux',
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
  image: {
    en: 'Image',
    fr: 'Image',
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
  name: {
    en: 'Name',
    fr: 'Nom',
  },
  no_file: {
    en: 'No file selected',
    fr: 'Aucun fichier sélectionné',
  },
  not_an_image: {
    en: 'The selected file is not an image',
    fr: "Le fichier sélectionné n'est pas une image",
  },
  pages: {
    en: 'Pages',
    fr: 'Pages',
  },
  submit: {
    en: 'Submit',
    fr: 'Envoyer',
  },
  subtitle: {
    en: 'Subtitle',
    fr: 'Sous-titre',
  },
  text: {
    en: 'Text',
    fr: 'Texte',
  },
  title: {
    en: 'Title',
    fr: 'Titre',
  },
  toast_added: {
    en: 'Successfully added',
    fr: 'Ajouté avec succès',
  },
  toast_deleted: {
    en: 'Successfully deleted',
    fr: 'Supprimé avec succès',
  },
  toast_modified: {
    en: 'Successfully modified',
    fr: 'Modifié avec succès',
  },
  toast_reordered: {
    en: 'Items reordered',
    fr: 'Éléments réordonnés',
  },
  upload: {
    en: 'Upload',
    fr: 'Upload',
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
