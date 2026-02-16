import { DraftOrder } from '@/types'
import calculatePrice from '@/utils/calculatePrice'
import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    orders: {} as Record<number, DraftOrder>,
    address_id: undefined as number | undefined,
    paymentMethodId: undefined as number | undefined,
  }),
  getters: {
    orderLength: (state) => Object.values(state.orders).length,
    totalPrice: (state) => {
      let price = 0

      Object.values(state.orders).forEach(
        (order) => (price += calculatePrice(order.product.price, order.length, order.users, order.amount)),
      )

      return price
    },
  },
  actions: {
    addOrder(order: DraftOrder) {
      this.orders[order.product.id] = order
    },
  },
})
