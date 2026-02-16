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
    // save order in localstorage
    saveOrders() {
      localStorage.setItem('orders', JSON.stringify({ orders: this.orders, created_at: new Date().toISOString() }))
    },
    // restore order from localstorage
    restoreOrders() {
      // get data
      const data = localStorage.getItem('orders')
      if (!data) return

      // parse and get age
      const parsed = JSON.parse(data)
      const age = new Date().getTime() - new Date(parsed.created_at).getTime()

      // if less than 1 hour, restore, if longer, clear localstorage
      age < 1000 * 60 * 60 ? (this.orders = parsed.orders) : localStorage.removeItem('orders')
    },

    addOrder(order: DraftOrder) {
      this.orders[order.product.id] = order

      this.saveOrders()
    },
  },
})
