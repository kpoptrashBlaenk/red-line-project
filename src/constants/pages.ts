import { TranslationKey } from '@/utils/translation'

const pageKeys = {
  home: 'home',
  categories: 'categories',
  products: 'products',
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
  mobileOnly?: boolean
  auth?: 'auth' | 'guest'
}

const pages: Record<PageKey, Page> = {
  home: {
    translationKey: pageKeys.home,
    url: '/home',
  },
  categories: {
    translationKey: pageKeys.categories,
    url: '/categories',
  },
  products: {
    translationKey: pageKeys.products,
    url: '/products',
  },
  contact: {
    translationKey: pageKeys.contact,
    url: '/contact',
    mobileOnly: true,
  },
  legal_mentions: {
    translationKey: pageKeys.legal_mentions,
    url: '/legal',
    mobileOnly: true,
  },
  general_conditions: {
    translationKey: pageKeys.general_conditions,
    url: '/conditions',
    mobileOnly: true,
  },

  admin: {
    translationKey: pageKeys.admin,
    url: '/admin',
    auth: 'auth',
  },
  account: {
    translationKey: pageKeys.account,
    url: '/account',
    auth: 'auth',
  },
  register: {
    translationKey: pageKeys.register,
    url: '/register',
    auth: 'guest',
  },
  login: {
    translationKey: pageKeys.login,
    url: '/login',
    auth: 'guest',
  },
}

export default pages
