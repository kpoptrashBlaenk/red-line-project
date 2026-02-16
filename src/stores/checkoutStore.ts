import { OrderBody } from '$/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('checkout', {
  state: () => ({
    checkout: {} as Record<number, OrderBody>,
  }),
  getters: {
    orderLength: (state) => Object.values(state.checkout).length,
  },
  actions: {
    addOrder(order: OrderBody) {
      this.checkout[order.product_id] = order
    },
  },
})
