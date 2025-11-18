import { User, UserSchema } from '@/types'
import { apiPost } from '@/utils/api'
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
      const token = localStorage.getItem('this_is_empty')

      const user = await apiPost<User>('/api/user', { token })

      if (user) {
        this.user = user
      }
    },

    // login user
    async login(body: UserSchema) {
      console.log(body)
      return
      const user = await apiPost<User>('/api/login', body)

      if (user) {
        this.user = user
      }
    },
  },
})
