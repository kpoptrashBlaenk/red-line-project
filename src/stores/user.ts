import { User } from '$/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
  }),
  getters: {},
  actions: {
    /**
     * Set this user after registration or login
     *
     * @param user Logged in user
     */
    setUser(user: User) {
      this.user = user
    },

    /**
     * Restore session using local storage token (used in middleware)
     */
    async restoreSession() {
      return
    },
  },
})
