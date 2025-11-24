import { User, UserSchema } from '@/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
  }),
  getters: {},
  actions: {
    /**
     * Restore session using local storage token (used in middleware)
     */
    async restoreSession() {
      return
    },

    /**
     * Log the user in using an email and password
     */
    async login(body: UserSchema) {
      console.log(body)
      return
    },
  },
})
