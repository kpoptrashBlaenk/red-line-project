import { Address, PaymentMethod, Subscription } from '$/types'
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
    const subscriptions: Subscription[] = Object.values(subscriptionFixtures)

    return subscriptions
  }

  async function deactivateSubscription(subscription: Subscription) {
    subscription
  }

  async function modifySubscription(subscriptionId: number, newOrder: DraftOrder) {
    subscriptionId
    newOrder
  }

  return { sendPaymentData, getSubscriptions, deactivateSubscription, modifySubscription }
}
