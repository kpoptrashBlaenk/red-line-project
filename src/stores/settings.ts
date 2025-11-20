import { Language } from '@/types'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'en' as Language,
  }),

  getters: {
    getLanguage: (state) => state.language,
  },

  actions: {
    setLanguage(lang: Language) {
      this.language = lang
    },
  },
})
