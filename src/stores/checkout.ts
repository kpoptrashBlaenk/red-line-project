import { Address, PaymentMethod } from '$/types'
import { useOrder } from '@/composables/order'
import { DraftOrder } from '@/types'
import calculatePrice from '@/utils/calculatePrice'
import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    orders: {} as Record<number, DraftOrder>,
    address: undefined as Address | undefined,
    paymentMethod: undefined as PaymentMethod | undefined,
    expiresAt: undefined as number | undefined,
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
      const expiresAt = Date.now() + 1000 * 60 * 60
      this.expiresAt = expiresAt

      localStorage.setItem('orders', JSON.stringify({ orders: this.orders, expires_at: expiresAt }))
    },
    // restore order from localstorage
    restoreOrders() {
      // get data
      const data = localStorage.getItem('orders')
      if (!data) return

      // parse
      const parsed = JSON.parse(data)

      // if not passed, restore, if not, clear orders
      if (Date.now() < parsed.expires_at) {
        this.orders = parsed.orders
        this.expiresAt = parsed.expires_at
      } else {
        this.clearOrders()
      }
    },

    addOrder(order: DraftOrder) {
      this.orders[order.product.id] = order

      // if amount is 0 then delete from order
      if (order.amount === 0) {
        delete this.orders[order.product.id]
      }

      this.saveOrders()
    },
    setAddress(address: Address) {
      this.address = address
    },
    setPaymentMethod(paymentMethod: PaymentMethod) {
      this.paymentMethod = paymentMethod
    },
    clearOrders() {
      this.orders = {}
      this.expiresAt = undefined
      localStorage.removeItem('orders')
    },
    timer() {
      if (!this.expiresAt || this.orderLength === 0) return 0

      const time = Math.max(0, this.expiresAt - Date.now())

      if (time === 0) {
        this.clearOrders()
      }

      return time
    },

    async sendPaymentData() {
      const { sendPaymentData } = useOrder()

      if (!this.address || !this.paymentMethod) return

      const approveUrl = await sendPaymentData(this.orders, this.address, this.paymentMethod)

      window.location.href = approveUrl
    },
  },
})
