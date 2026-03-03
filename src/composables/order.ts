import { Address, Order, PaymentMethod, Subscription } from '$/types'
import { orderFixtures, subscriptionFixtures } from '@/constants/fixtures'
import { DraftOrder } from '@/types'
import { FileTransfer } from '@capacitor/file-transfer'
import { Directory, Filesystem } from '@capacitor/filesystem'

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

  /**
   * Get all orders
   */
  async function getOrders() {
    const orders: Order[] = Object.values(orderFixtures)

    return orders
  }

  async function getSubscriptions() {
    const subscriptions: Subscription[] = Object.values(subscriptionFixtures)

    return subscriptions
  }

  /**
   * Deactivate a subscription
   */
  async function deactivateSubscription(subscription: Subscription) {
    subscription
  }

  /**
   * Modify a subscription
   */
  async function modifySubscription(subscriptionId: number, newOrder: DraftOrder) {
    subscriptionId
    newOrder
  }

  /* Download an order invoice */
  async function downloadOrder(order: Order) {
    // get filesystem path
    const fileInfo = await Filesystem.getUri({
      directory: Directory.Documents,
      path: `${order.created_at.replace(/[-:TZ.]/g, '').slice(0, 14)}.pdf`,
    })

    // download with file transfer
    await FileTransfer.downloadFile({
      url: '',
      path: fileInfo.uri,
      progress: false,
    })
  }

  return { sendPaymentData, getOrders, getSubscriptions, deactivateSubscription, modifySubscription, downloadOrder }
}
