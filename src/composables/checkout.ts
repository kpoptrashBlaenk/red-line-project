import { Address, PaymentMethod } from '$/types'
import { DraftOrder } from '@/types'

/**
 * Use this composable to do auth related queries
 */
export function useCheckout() {
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

  return { sendPaymentData }
}
