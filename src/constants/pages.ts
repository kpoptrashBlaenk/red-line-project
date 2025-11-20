import { TranslationKey } from '@/utils/translation'

const pageKeys = {
  home: 'home',
  legal_mentions: 'legal_mentions',
  general_conditions: 'general_conditions',
  contact: 'contact',
} as const

type PageKey = keyof typeof pageKeys
type Page = {
  translationKey: TranslationKey
  url: string
  mobileOnly?: boolean
}

const pages: Record<PageKey, Page> = {
  home: {
    translationKey: pageKeys.home,
    url: '/home',
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
}

export default pages
