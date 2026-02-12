import { LanguageRecord } from '$/types'
import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import toTitle from './toTitle'

const translationKeys = {
  // A
  account: 'account',
  add: 'add',
  admin: 'admin',
  admin_category_title: 'admin_category_title',
  admin_characteristic_title: 'admin_characteristic_title',
  admin_home_carousel_title: 'admin_home_carousel_title',
  admin_home_text_title: 'admin_home_carousel_title',
  admin_product_title: 'admin_product_title',
  addresses: 'addresses',
  advantages: 'advantages',
  alert_header: 'alert_header',
  alert_message: 'alert_message',
  all_services: 'all_services',
  already_account: 'already_account',
  authentication: 'authentication',

  // B
  button_text: 'promotion_button',

  // C
  cancel: 'cancel',
  card_number: 'card_number',
  categories: 'categories',
  category: 'category',
  category_products_title: 'category_products_title',
  characteristics: 'characteristics',
  contact: 'contact',
  confirm_password: 'confirm_password',
  country_code: 'country_code',
  cvv: 'cvv',

  // D
  default: 'default',
  delete: 'delete',
  description: 'description',
  description_advantage: 'description_advantage',
  description_functionality: 'description_functionality',
  description_security: 'description_security',
  details: 'details',
  disponible: 'disponible',
  disponible_only: 'disponible_only',

  // E
  email: 'email',
  english: 'english',
  expiration: 'expiration',
  error_category_post_500: 'error_category_post_500',
  error_password_confirm: 'error_password_confirm',
  error_password_lowercase: 'error_password_lowercase',
  error_password_min: 'error_password_min',
  error_password_max: 'error_password_max',
  error_password_no_spaces: 'error_password_no_spaces',
  error_password_number: 'error_password_number',
  error_password_special: 'error_password_special',
  error_password_uppercase: 'error_password_uppercase',
  error_password_verify: 'error_password_verify',
  error_required: 'error_required',
  extended_address: 'extended_address',

  // F
  file_too_big: 'file_too_big',
  first_name: 'first_name',
  french: 'french',
  functionalities: 'functionalities',

  // G
  general: 'general',
  general_conditions: 'general_conditions',

  // H
  home: 'home',
  home_carousel_title: 'home_carousel_title',
  home_category_title: 'home_category_title',
  home_product_title: 'home_product_title',

  // I
  image: 'image',

  // L
  last_name: 'last_name',
  legal_mentions: 'legal_mentions',
  level: 'level',
  link: 'link',
  locality: 'locality',
  login: 'login',
  login_info: 'login_info',
  logout: 'logout',

  // M
  menu: 'menu',
  monthly: 'monthly',

  // N
  name: 'name',
  new: 'new',
  no_account: 'no_account',
  no_file: 'no_file',
  not_an_image: 'not_an_image',
  not_disponible: 'not_disponible',

  // O
  old: 'old',
  optional: 'optional',

  // P
  pages: 'pages',
  password: 'password',
  payment_methods: 'payment_methods',
  per_user: 'per_user',
  per_device: 'per_device',
  performance: 'performance',
  phone: 'phone',
  postal_code: 'postal_code',
  price: 'price',
  priceHL: 'priceHL',
  priceLH: 'priceLH',
  priority: 'priority',
  product_characteristics_title: 'product_characteristics_title',
  product_price_title: 'product_price_title',
  products: 'products',

  // R
  region: 'region',
  register: 'register',
  register_info: 'register_info',
  register_now: 'register_now',

  // S
  scalability: 'scalability',
  search_product: 'search_product',
  securities: 'securities',
  sign_in_now: 'sign_in_now',
  sort: 'sort',
  street_address: 'street_address',
  submit: 'submit',
  subscribe_now: 'subscribe_now',
  subtitle: 'promotion_subtitle',

  // T
  text: 'text',
  title: 'promotion_title',
  toast_added: 'toast_added',
  toast_deleted: 'toast_deleted',
  toast_modified: 'toast_modified',
  toast_reordered: 'toast_reordered',
  top: 'top',
  type: 'type',

  // U
  upload: 'upload',
  user_info: 'user_info',

  // V
  verify_password: 'verify_password',

  // Y
  yearly: 'yearly',
}

export type TranslationKey = keyof typeof translationKeys

const translations: Record<TranslationKey, Record<Language, string>> = {
  // A
  account: {
    en: 'Account',
    fr: 'Compte',
  },
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
  addresses: {
    en: 'Addresses',
    fr: 'Adresses',
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
  already_account: {
    en: 'Already have an account?',
    fr: 'Vous avez déjà un compte?',
  },
  authentication: {
    en: 'Authentication',
    fr: 'Authentification',
  },

  // B
  button_text: {
    en: 'Button text',
    fr: 'Texte du bouton',
  },

  // C
  cancel: {
    en: 'Cancel',
    fr: 'Annuler',
  },
  card_number: {
    en: 'Card Number',
    fr: 'Numéro de carte',
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
  confirm_password: {
    en: 'Confirm Password',
    fr: 'Confirmer le mot de passe',
  },
  country_code: {
    en: 'Country',
    fr: 'Pays',
  },
  cvv: {
    en: 'CVV',
    fr: 'CVV',
  },

  // D
  default: {
    en: 'Default',
    fr: 'Par défaut',
  },
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
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

  // E
  english: {
    en: 'English',
    fr: 'Anglais',
  },
  email: {
    en: 'Email',
    fr: 'Email',
  },
  error_category_post_500: {
    en: "Couldn't create category",
    fr: 'Impossible de créer la catégorie',
  },
  error_password_confirm: {
    en: "Passwords don't match",
    fr: 'Les mots de passe ne correspondent pas',
  },
  error_password_lowercase: {
    en: 'Password must contain at least one lowercase letter',
    fr: 'Le mot de passe doit contenir au moins une lettre minuscule',
  },
  error_password_max: {
    en: 'Password must be at most 128 characters long',
    fr: 'Le mot de passe doit contenir au maximum 128 caractères',
  },
  error_password_min: {
    en: 'Password must be at least 8 characters long',
    fr: 'Le mot de passe doit contenir au moins 8 caractères',
  },
  error_password_no_spaces: {
    en: 'Password must not contain spaces',
    fr: "Le mot de passe ne doit pas contenir d'espaces",
  },
  error_password_number: {
    en: 'Password must contain at least one number',
    fr: 'Le mot de passe doit contenir au moins un chiffre',
  },
  error_password_special: {
    en: 'Password must contain at least one special character',
    fr: 'Le mot de passe doit contenir au moins un caractère spécial',
  },
  error_password_uppercase: {
    en: 'Password must contain at least one uppercase letter',
    fr: 'Le mot de passe doit contenir au moins une lettre majuscule',
  },
  error_password_verify: {
    en: 'Incorrect password',
    fr: 'Mot de passe incorrect',
  },
  error_required: {
    en: 'Please fill out this field',
    fr: 'Veuillez remplir ce champ',
  },
  extended_address: {
    en: 'Extended Address',
    fr: "Complément d'adresse",
  },
  expiration: {
    en: 'Expiration Date',
    fr: "Date d'expiration",
  },

  // F
  file_too_big: {
    en: 'The selected file is too large',
    fr: 'Le fichier sélectionné est trop volumineux',
  },
  first_name: {
    en: 'First Name',
    fr: 'Prénom',
  },
  french: {
    en: 'French',
    fr: 'Français',
  },
  functionalities: {
    en: 'Functionalities',
    fr: 'Fonctionnalités',
  },

  // G
  general: {
    en: 'General',
    fr: 'Général',
  },
  general_conditions: {
    en: 'General Conditions',
    fr: 'Conditions générales',
  },

  // H
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

  // I
  image: {
    en: 'Image',
    fr: 'Image',
  },

  // L
  last_name: {
    en: 'Last Name',
    fr: 'Nom',
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
  locality: {
    en: 'City',
    fr: 'Ville',
  },
  login: {
    en: 'Login',
    fr: 'Se connecter',
  },
  login_info: {
    en: 'Please fill out the information below to log in',
    fr: 'Veuillez remplir les informations ci-dessous pour vous connecter',
  },
  logout: {
    en: 'Logout',
    fr: 'Se déconnecter',
  },

  // M
  menu: {
    en: 'Menu',
    fr: 'Menu',
  },
  monthly: {
    en: 'Monthly',
    fr: 'Mensuel',
  },

  // N
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
  no_account: {
    en: 'No account?',
    fr: 'Pas de compte?',
  },
  not_an_image: {
    en: 'The selected file is not an image',
    fr: "Le fichier sélectionné n'est pas une image",
  },
  not_disponible: {
    en: 'Not available',
    fr: 'Non disponible',
  },

  // O
  old: {
    en: 'Oldest',
    fr: 'Nouveauté : ancien',
  },
  optional: {
    en: 'optional',
    fr: 'optionnel',
  },

  // P
  pages: {
    en: 'Pages',
    fr: 'Pages',
  },
  password: {
    en: 'Password',
    fr: 'Mot de passe',
  },
  payment_methods: {
    en: 'Payment Methods',
    fr: 'Méthodes de paiement',
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
  phone: {
    en: 'Phone',
    fr: 'Téléphone',
  },
  postal_code: {
    en: 'Postal Code',
    fr: 'Code postal',
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
  products: {
    en: 'Products',
    fr: 'Produits',
  },

  // R
  region: {
    en: 'Region',
    fr: 'Région',
  },
  register: {
    en: 'Register',
    fr: "S'inscrire",
  },
  register_info: {
    en: 'Please fill out the information below to create your account',
    fr: 'Veuillez remplir les informations ci-dessous pour créer votre compte',
  },
  register_now: {
    en: 'Register now!',
    fr: 'Inscrivez vous maintenant!',
  },

  // S
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
  sign_in_now: {
    en: 'Sign in now!',
    fr: 'Connectez-vous maintenant!',
  },
  sort: {
    en: 'Sort',
    fr: 'Trier',
  },
  street_address: {
    en: 'Street Address',
    fr: 'Adresse',
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

  // T
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

  // U
  upload: {
    en: 'Upload',
    fr: 'Upload',
  },
  user_info: {
    en: 'User Information',
    fr: 'Informations Utilisateur',
  },

  // V
  verify_password: {
    en: 'Verify Password',
    fr: 'Vérifier le mot de passe',
  },

  // Y
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
