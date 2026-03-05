import { LanguageRecord } from '$/types'
import { useSettingsStore } from '@/stores/settings'
import { Language } from '@/types'
import toTitle from './toTitle'

const translationKeys = {
  // A
  account: 'account',
  active: 'active',
  add: 'add',
  add_address: 'add_address',
  add_products: 'add_products',
  add_payment: 'add_payment',
  address: 'address',
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
  amount: 'amount',
  ask_anything: 'ask_anything',
  authentication: 'authentication',

  // B
  button_text: 'promotion_button',
  billing: 'billing',
  billing_information: 'billing_information',

  // C
  cancel: 'cancel',
  card_number: 'card_number',
  categories: 'categories',
  category: 'category',
  category_products_title: 'category_products_title',
  characteristics: 'characteristics',
  chatbot: 'chatbot',
  checkout: 'checkout',
  close: 'close',
  contact: 'contact',
  confirm_password: 'confirm_password',
  country_code: 'country_code',
  cvv: 'cvv',

  // D
  danger: 'danger',
  deactivate: 'deactivate',
  default: 'default',
  delete: 'delete',
  delete_account: 'delete_account',
  description: 'description',
  description_advantage: 'description_advantage',
  description_functionality: 'description_functionality',
  description_security: 'description_security',
  details: 'details',
  device: 'device',
  disponible: 'disponible',
  disponible_only: 'disponible_only',
  download: 'download',

  // E
  email: 'email',
  empty_cart: 'empty_cart',
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
  forgot_password: 'forgot_password',
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
  inactive: 'inactive',

  // L
  last_name: 'last_name',
  legal_mentions: 'legal_mentions',
  length: 'length',
  level: 'level',
  link: 'link',
  locality: 'locality',
  login: 'login',
  login_info: 'login_info',
  logout: 'logout',

  // M
  menu: 'menu',
  message: 'message',
  monthly: 'monthly',

  // N
  name: 'name',
  new: 'new',
  new_chat: 'new_chat',
  no_account: 'no_account',
  no_file: 'no_file',
  not_an_image: 'not_an_image',
  not_disponible: 'not_disponible',

  // O
  old: 'old',
  online: 'online',
  optional: 'optional',
  order_details: 'order_details',

  // P
  pages: 'pages',
  password: 'password',
  pay: 'pay',
  payment_method: 'payment_method',
  payment_methods: 'payment_methods',
  performance: 'performance',
  phone: 'phone',
  postal_code: 'postal_code',
  price: 'price',
  priceHL: 'priceHL',
  priceLH: 'priceLH',
  priority: 'priority',
  product: 'product',
  product_characteristics_title: 'product_characteristics_title',
  product_price_title: 'product_price_title',
  products: 'products',
  profile: 'profile',

  // R
  reactivate: 'reactivate',
  region: 'region',
  register: 'register',
  register_info: 'register_info',
  register_now: 'register_now',
  renewed: 'renewed',
  renews_on: 'renews_on',
  reset_password: 'reset_password',

  // S
  scalability: 'scalability',
  search_order: 'search_order',
  search_product: 'search_product',
  securities: 'securities',
  sign_in_now: 'sign_in_now',
  sort: 'sort',
  street_address: 'street_address',
  subject: 'subject',
  submit: 'submit',
  subscribe_now: 'subscribe_now',
  subscriptions: 'subscriptions',
  subtitle: 'subtitle',
  summary: 'summary',

  // T
  text: 'text',
  title: 'promotion_title',
  toast_added: 'toast_added',
  toast_deleted: 'toast_deleted',
  toast_modified: 'toast_modified',
  toast_password_reset: 'toast_password_reset',
  toast_reordered: 'toast_reordered',
  toast_reset_link: 'toast_reset_link',
  top: 'top',
  total: 'total',
  type: 'type',

  // U
  upload: 'upload',
  user: 'user',
  user_info: 'user_info',

  // V
  verify_password: 'verify_password',

  // Y
  yearly: 'yearly',
  you: 'you',
}

export type TranslationKey = keyof typeof translationKeys

const translations: Record<TranslationKey, Record<Language, string>> = {
  // A
  account: {
    en: 'Account',
    fr: 'Compte',
  },
  active: {
    en: 'Active',
    fr: 'Actif',
  },
  add: {
    en: 'Add',
    fr: 'Ajouter',
  },
  add_address: {
    en: 'Add new address',
    fr: 'Ajouter une nouvelle adresse',
  },
  add_payment: {
    en: 'Add new payment method',
    fr: 'Ajouter un nouveau mode de paiement',
  },
  add_products: {
    en: 'Add new products',
    fr: 'Ajouter de nouveaux produits',
  },
  address: {
    en: 'Address',
    fr: 'Adresse',
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
  amount: {
    en: 'Amount',
    fr: 'Quantité',
  },
  ask_anything: {
    en: 'Ask anything...',
    fr: "Demandez n'importe quoi...",
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
  billing: {
    en: 'Billing',
    fr: 'Facturation',
  },
  billing_information: {
    en: 'Billing Information',
    fr: 'Informations de facturation',
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
  chatbot: {
    en: 'Chatbot',
    fr: 'Chatbot',
  },
  checkout: {
    en: 'Checkout',
    fr: 'Panier',
  },
  close: {
    en: 'Close',
    fr: 'Fermer',
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
  danger: {
    en: 'Danger',
    fr: 'Danger',
  },
  deactivate: {
    en: 'Deactivate',
    fr: 'Désactiver',
  },
  default: {
    en: 'Default',
    fr: 'Par défaut',
  },
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
  },
  delete_account: {
    en: 'Delete Account',
    fr: 'Supprimer le Compte',
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
  device: {
    en: 'Per Device',
    fr: 'Par Appareil',
  },
  disponible: {
    en: 'Available',
    fr: 'Disponible',
  },
  disponible_only: {
    en: 'Available Only',
    fr: 'Services disponibles',
  },
  download: {
    en: 'Download',
    fr: 'Télécharger',
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
  empty_cart: {
    en: 'Your Cart is Empty!',
    fr: 'Votre Panier est Vide!',
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
  forgot_password: {
    en: 'I forgot my password',
    fr: "J'oubliais mon mot de passe",
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
  inactive: {
    en: 'Inactive',
    fr: 'Inactif',
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
  length: {
    en: 'Length',
    fr: 'Durée',
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
  message: {
    en: 'Message',
    fr: 'Message',
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
  new_chat: {
    en: 'New Chat',
    fr: 'Nouveau Chat',
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
  online: {
    en: 'Online',
    fr: 'En ligne',
  },
  optional: {
    en: 'optional',
    fr: 'optionnel',
  },
  order_details: {
    en: 'Order Details',
    fr: 'Détails de la commande',
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
  pay: {
    en: 'Pay',
    fr: 'Payer',
  },
  payment_method: {
    en: 'Payment Method',
    fr: 'Méthode de paiement',
  },
  payment_methods: {
    en: 'Payment Methods',
    fr: 'Méthodes de paiement',
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
  product: {
    en: 'Product',
    fr: 'Produit',
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
  profile: {
    en: 'Profile',
    fr: 'Profil',
  },

  // R
  reactivate: {
    en: 'Reactivate',
    fr: 'Réactiver',
  },
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
  renewed: {
    en: 'Renewed',
    fr: 'Renouvelé',
  },
  renews_on: {
    en: 'Renews on',
    fr: 'Renouvellement le',
  },
  reset_password: {
    en: 'Reset Password',
    fr: 'Réinitialiser mon mot de passe',
  },

  // S
  scalability: {
    en: 'Scalability',
    fr: 'Scalabilité',
  },
  search_order: {
    en: 'Search for orders...',
    fr: 'Rechercher des commandes...',
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
  subject: {
    en: 'Subject',
    fr: 'Sujet',
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
  subscriptions: {
    en: 'Subscriptions',
    fr: 'Abonnements',
  },
  summary: {
    en: 'Summary',
    fr: 'Résumé',
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
  toast_password_reset: {
    en: 'Password has been reset',
    fr: 'Mot de passe a été réinitialisé',
  },
  toast_reordered: {
    en: 'Items reordered',
    fr: 'Éléments réordonnés',
  },
  toast_reset_link: {
    en: 'Reset link has been sent',
    fr: 'Lien de réinitialisation evnoyé',
  },
  top: {
    en: 'Top',
    fr: 'Top',
  },
  total: {
    en: 'Total',
    fr: 'Total',
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
  user: {
    en: 'Per User',
    fr: 'Par Utilisateur',
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
  you: {
    en: 'You',
    fr: 'Vous',
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
