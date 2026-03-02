import { Address, Order, PaymentMethod } from '$/types'
import { subscriptionFixtures } from '@/constants/fixtures'
import { DraftOrder } from '@/types'

/**
 * Use this composable to do order related queries
 */
export function useOrder() {
  /**
   * Send payment data to backend
   */
  async function sendPaymentData(orders: Record<number, DraftOrder>, address: Address, paymentMethod: PaymentMethod) {
    // send payment data to backend
    // receive approval url for paypal
    orders
    address
    paymentMethod

    const data = 'approvalUrl'

    return data
  }

  async function getSubscriptions() {
    const subscriptions: Order[] = Object.values(subscriptionFixtures)

    return subscriptions
  }

  return { sendPaymentData, getSubscriptions }
}
