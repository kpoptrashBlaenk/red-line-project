import { Language } from '@/types'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    language: 'en' as Language,
  }),

  getters: {
    /**
     * Get the selected app language
     */
    getLanguage: (state) => state.language,
  },

  actions: {
    /**
     * Set the app language
     *
     * @param lang New selected language
     */
    setLanguage(lang: Language) {
      this.language = lang
    },
  },
})
