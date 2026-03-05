import { TranslationKey } from '@/utils/translation'

const pageKeys = {
  home: 'home',
  categories: 'categories',
  products: 'products',
  checkout: 'checkout',
  legal_mentions: 'legal_mentions',
  general_conditions: 'general_conditions',
  contact: 'contact',

  admin: 'admin',
  account: 'account',
  register: 'register',
  login: 'login',
} as const

type PageKey = keyof typeof pageKeys
type Page = {
  translationKey: TranslationKey
  url: string
  section: number
  mobileOnly?: boolean
  auth?: 'guest' | 'auth'
  admin?: boolean
}

const pages: Record<PageKey, Page> = {
  home: {
    translationKey: pageKeys.home,
    url: '/home',
    section: 0,
  },
  categories: {
    translationKey: pageKeys.categories,
    url: '/categories',
    section: 0,
  },
  products: {
    translationKey: pageKeys.products,
    url: '/products',
    section: 0,
  },
  checkout: {
    translationKey: pageKeys.checkout,
    url: '/checkout',
    section: 0,
  },
  contact: {
    translationKey: pageKeys.contact,
    url: '/contact',
    mobileOnly: true,
    section: 1,
    auth: 'auth',
  },
  legal_mentions: {
    translationKey: pageKeys.legal_mentions,
    url: '/legal-mentions',
    mobileOnly: true,
    section: 1,
  },
  general_conditions: {
    translationKey: pageKeys.general_conditions,
    url: '/general-conditions',
    mobileOnly: true,
    section: 1,
  },

  admin: {
    translationKey: pageKeys.admin,
    url: '/admin',
    auth: 'auth',
    section: 2,
    admin: true,
  },
  account: {
    translationKey: pageKeys.account,
    url: '/account',
    auth: 'auth',
    section: 2,
  },
  register: {
    translationKey: pageKeys.register,
    url: '/register',
    auth: 'guest',
    section: 2,
  },
  login: {
    translationKey: pageKeys.login,
    url: '/login',
    auth: 'guest',
    section: 2,
  },
}

export default pages
