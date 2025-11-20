import { TranslationKey } from '@/types'
import translationKeys from './translationKeys'

const pageKeys = {
  home: 'home',
  legal_mentions: 'legal_mentions',
  general_conditions: 'general_conditions',
} as const

type PageKey = keyof typeof pageKeys
type Page = {
  translationKey: TranslationKey
  url: string
  monileOnly?: boolean
}

const pages: Record<PageKey, Page> = {
  home: {
    translationKey: translationKeys.home,
    url: '/home',
  },
  legal_mentions: {
    translationKey: translationKeys.legal_mentions,
    url: '/',
    monileOnly: true,
  },
  general_conditions: {
    translationKey: translationKeys.general_conditions,
    url: '/',
    monileOnly: true,
  },
}

export default pages
