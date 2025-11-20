import { User, UserSchema } from '@/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
  }),
  getters: {},
  actions: {
    // restore session using local storage token (used in middleware)
    async restoreSession() {
      return
    },

    // login user
    async login(body: UserSchema) {
      console.log(body)
      return
    },
  },
})
