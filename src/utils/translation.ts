import { LanguageRecord } from '$/types'
import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import toTitle from './toTitle'

const translationKeys = {
  add: 'add',
  admin: 'admin',
  admin_category_title: 'admin_category_title',
  admin_characteristic_title: 'admin_characteristic_title',
  admin_home_carousel_title: 'admin_home_carousel_title',
  admin_home_text_title: 'admin_home_carousel_title',
  admin_product_title: 'admin_product_title',
  advantages: 'advantages',
  alert_header: 'alert_header',
  alert_message: 'alert_message',
  all_services: 'all_services',
  button_text: 'promotion_button',
  cancel: 'cancel',
  categories: 'categories',
  category: 'category',
  category_products_title: 'category_products_title',
  characteristics: 'characteristics',
  contact: 'contact',
  default: 'default',
  delete: 'delete',
  description: 'description',
  description_advantage: 'description_advantage',
  description_functionality: 'description_functionality',
  description_security: 'description_security',
  details: 'details',
  disponible: 'disponible',
  disponible_only: 'disponible_only',
  english: 'english',
  error_category_post_500: 'error_category_post_500',
  error_required: 'error_required',
  file_too_big: 'file_too_big',
  french: 'french',
  functionalities: 'functionalities',
  general: 'general',
  general_conditions: 'general_conditions',
  home: 'home',
  home_carousel_title: 'home_carousel_title',
  home_category_title: 'home_category_title',
  home_product_title: 'home_product_title',
  image: 'image',
  legal_mentions: 'legal_mentions',
  level: 'level',
  link: 'link',
  login: 'login',
  menu: 'menu',
  monthly: 'monthly',
  name: 'name',
  new: 'new',
  no_file: 'no_file',
  not_an_image: 'not_an_image',
  not_disponible: 'not_disponible',
  old: 'old',
  pages: 'pages',
  per_user: 'per_user',
  per_device: 'per_device',
  performance: 'performance',
  price: 'price',
  priceHL: 'priceHL',
  priceLH: 'priceLH',
  priority: 'priority',
  product_characteristics_title: 'product_characteristics_title',
  product_price_title: 'product_price_title',
  register: 'register',
  scalability: 'scalability',
  search_product: 'search_product',
  securities: 'securities',
  sort: 'sort',
  submit: 'submit',
  subscribe_now: 'subscribe_now',
  subtitle: 'promotion_subtitle',
  text: 'text',
  title: 'promotion_title',
  toast_added: 'toast_added',
  toast_deleted: 'toast_deleted',
  toast_modified: 'toast_modified',
  toast_reordered: 'toast_reordered',
  top: 'top',
  type: 'type',
  upload: 'upload',
  yearly: 'yearly',
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
  admin_category_title: {
    en: 'Categories',
    fr: 'Catégories',
  },
  admin_characteristic_title: {
    en: 'Characteristics',
    fr: 'Caractéristiques',
  },
  admin_home_carousel_title: {
    en: 'Home Promotion Carousel',
    fr: "Carrousel de promotions d'accueil",
  },
  admin_home_text_title: {
    en: 'Home Text Box',
    fr: "Boîte de texte d'accueil",
  },
  admin_product_title: {
    en: 'Products',
    fr: 'Produits',
  },
  advantages: {
    en: 'Your benefits',
    fr: 'Vos avantages',
  },
  alert_header: {
    en: 'Are you sure?',
    fr: 'Êtes-vous sûr?',
  },
  alert_message: {
    en: 'This action cannot be undone.',
    fr: 'Cette action est irréversible.',
  },
  all_services: {
    en: 'All Services',
    fr: 'Tous les services',
  },
  button_text: {
    en: 'Button text',
    fr: 'Texte du bouton',
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler',
  },
  categories: {
    en: 'Categories',
    fr: 'Catégories',
  },
  category: {
    en: 'Category',
    fr: 'Catégorie',
  },
  category_products_title: {
    en: `Our ${toTitle('services')} in this ${toTitle('category')}`,
    fr: `Nos ${toTitle('services')} dans cette ${toTitle('catégorie')}`,
  },
  characteristics: {
    en: 'Characteristics',
    fr: 'Caractéristiques',
  },
  contact: {
    en: 'Contact',
    fr: 'Contacte',
  },
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
  },
  default: {
    en: 'Default',
    fr: 'Par défaut',
  },
  description: {
    en: 'Description',
    fr: 'Description',
  },
  description_advantage: {
    en: 'Advantages Description',
    fr: 'Description des avantages',
  },
  description_functionality: {
    en: 'Functionality Description',
    fr: 'Description des fonctionnalités',
  },
  description_security: {
    en: 'Security Description',
    fr: 'Description de la sécurité',
  },
  details: {
    en: 'Details',
    fr: 'Détails',
  },
  disponible: {
    en: 'Available',
    fr: 'Disponible',
  },
  disponible_only: {
    en: 'Available Only',
    fr: 'Services disponibles',
  },
  english: {
    en: 'English',
    fr: 'Anglais',
  },
  error_category_post_500: {
    en: "Couldn't create category",
    fr: 'Impossible de créer la catégorie',
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
  functionalities: {
    en: 'Functionalities',
    fr: 'Fonctionnalités',
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
    en: `Explore Our ${toTitle('Categories')}`,
    fr: `Découvrez nos ${toTitle('catégories')}`,
  },
  home_product_title: {
    en: `Check Out Our ${toTitle('Top Products')}`,
    fr: `Parcourez nos ${toTitle('Meilleurs Produits')}`,
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
  level: {
    en: 'Level',
    fr: 'Niveau',
  },
  login: {
    en: 'Login',
    fr: 'Se connecter',
  },
  menu: {
    en: 'Menu',
    fr: 'Menu',
  },
  monthly: {
    en: 'Monthly',
    fr: 'Mensuel',
  },
  name: {
    en: 'Name',
    fr: 'Nom',
  },
  new: {
    en: 'Newest',
    fr: 'Nouveauté : récent',
  },
  no_file: {
    en: 'No file selected',
    fr: 'Aucun fichier sélectionné',
  },
  not_an_image: {
    en: 'The selected file is not an image',
    fr: "Le fichier sélectionné n'est pas une image",
  },
  not_disponible: {
    en: 'Not available',
    fr: 'Non disponible',
  },
  old: {
    en: 'Oldest',
    fr: 'Nouveauté : ancien',
  },
  pages: {
    en: 'Pages',
    fr: 'Pages',
  },
  per_user: {
    en: 'Per User',
    fr: 'Par Utilisateur',
  },
  per_device: {
    en: 'Per Device',
    fr: 'Par Appareil',
  },
  performance: {
    en: 'Performance',
    fr: 'Performance',
  },
  price: {
    en: 'Price',
    fr: 'Prix',
  },
  priceLH: {
    en: 'Price: Low to High',
    fr: 'Prix : du plus bas au plus élevé',
  },
  priceHL: {
    en: 'Price: High to Low',
    fr: 'Prix : du plus élevé au plus bas',
  },
  priority: {
    en: 'Priority',
    fr: 'Priorité',
  },
  product_characteristics_title: {
    en: 'Service <title>Characteristics</title>',
    fr: '<title>Caractéristiques</title> du service',
  },
  product_price_title: {
    en: '<title>Prices</title> for this Product',
    fr: '<title>Prix</title> pour ce Produit',
  },
  register: {
    en: 'Register',
    fr: "S'inscrire",
  },
  scalability: {
    en: 'Scalability',
    fr: 'Scalabilité',
  },
  search_product: {
    en: 'Search for products...',
    fr: 'Rechercher des produits...',
  },
  securities: {
    en: 'Securities',
    fr: 'Sécurités',
  },
  sort: {
    en: 'Sort',
    fr: 'Trier',
  },
  submit: {
    en: 'Submit',
    fr: 'Envoyer',
  },
  subtitle: {
    en: 'Subtitle',
    fr: 'Sous-titre',
  },
  subscribe_now: {
    en: 'Subscribe Now',
    fr: "S'abonner maintenant",
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
  top: {
    en: 'Top',
    fr: 'Top',
  },
  type: {
    en: 'Type',
    fr: 'Type',
  },
  upload: {
    en: 'Upload',
    fr: 'Upload',
  },
  yearly: {
    en: 'Yearly',
    fr: 'Annuel',
  },
}

/**
 * Translate static text in the selected app language.
 * If none is found, then return the transltion of the record
 *
 * @param record Translation key or an entire language record
 */
export default function (record: TranslationKey | LanguageRecord | undefined) {
  if (!record) return ''

  const setttingsStore = useSettingsStore()

  if (typeof record === 'string') {
    return translations[record][setttingsStore.getLanguage]
  }

  return record[setttingsStore.getLanguage]
}
