import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingStacks: 0 as number,
  }),

  getters: {
    loading: (state) => state.loadingStacks > 0,
  },

  actions: {
    addStack() {
      this.loadingStacks++
    },
    popStack() {
      if (this.loadingStacks > 0) {
        this.loadingStacks--
      }
    },
  },
})
