import apiUrls from '@/constants/apiUrls'
import { useSettingsStore } from '@/stores/settings'
import { ApiUrl } from '@/types'

export default function (key: ApiUrl) {
  const setttingsStore = useSettingsStore()

  return `api/${apiUrls[key]}?lang=${setttingsStore.getLanguage}`
}
