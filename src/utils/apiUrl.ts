import { useSettingsStore } from '@/stores/settings'

const urls = {
  footer_socials: 'footer/socials',
  footer_info_text: 'footer/info-text',
} as const

type ApiUrl = keyof typeof urls

/**
 * Get API URL by key
 *
 * @param key Key of wanted API
 */
export default function (key: ApiUrl) {
  const setttingsStore = useSettingsStore()

  return `api/${urls[key]}?lang=${setttingsStore.getLanguage}`
}
