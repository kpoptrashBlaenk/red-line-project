import apiUrl from '$/constants/apiUrl'
import { Order, Subscription } from '$/types'
import { useCheckoutStore } from '@/stores/checkout'
import { DraftOrder } from '@/types'
import { apiGet, apiPost } from '@/utils/api'
import calculatePrice from '@/utils/calculatePrice'
import presentToast from '@/utils/presentToast'
import { getStripe } from '@/utils/stripe'
import translation from '@/utils/translation'
import { FileTransfer } from '@capacitor/file-transfer'
import { Directory, Filesystem } from '@capacitor/filesystem'

/**
 * Use this composable to do order related queries
 */
export function useOrder() {
  /**
   * Send payment data to backend
   */
  async function createOrder(draftOrders: Record<number, DraftOrder>, addressId: number, paymentMethodId: number) {
    try {
      const stripe = await getStripe()

      const bodies = Object.values(draftOrders).map((draft) => ({
        product_id: draft.product.id,
        address_id: addressId,
        payment_method_id: paymentMethodId,
        length: draft.length,
        users: draft.users,
        amount: draft.amount,
        price: calculatePrice(draft.product.price, draft.length, draft.users, draft.amount),
      }))

      // create intent
      const { client_secret } = await apiPost<{ client_secret: string }>(apiUrl('order_create_intent'), bodies)

      //  confirm with stripe (and 3d secure)
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret)

      if (error) {
        await presentToast(error.message ?? translation('toast_payment_failed'), 'danger')
        return false
      }

      if (paymentIntent?.status !== 'succeeded') {
        await presentToast(translation('toast_payment_failed'), 'danger')
        return false
      }

      // confirm to backend
      await apiPost(apiUrl('order_confirm'), {
        payment_intent_id: paymentIntent.id,
        bodies,
      })

      useCheckoutStore().clearOrders()

      await presentToast(translation('toast_order_success'), 'success')
      return true
    } catch (error: any) {
      console.error('Error creating order:', error)
      await presentToast(error.message, 'danger')
      return false
    }
  }

  /**
   * Get all orders
   */
  async function getOrders() {
    try {
      const orders = await apiGet<Order[]>(apiUrl('order_get_all'))
      return orders ?? []

      // error
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      await presentToast(error.message, 'danger')
      return []
    }
  }

  async function getSubscriptions() {
    try {
      const subscriptions = await apiGet<Subscription[]>(apiUrl('subscription_get_all'))
      return subscriptions ?? []

      // error
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error)
      await presentToast(error.message, 'danger')
      return []
    }
  }

  /**
   * Reactivate a subscription
   */
  async function reactivateSubscription(id: number) {
    try {
      await apiPost<{ requires_action: boolean; client_secret?: string }>(apiUrl('subscription_reactivate'), {
        subscription_id: id,
      })

      await presentToast(translation('toast_subscription_reactivated'), 'success')
      return true
    } catch (error: any) {
      console.error('Error reactivating subscription:', error)
      await presentToast(error.message, 'danger')
      return false
    }
  }

  /**
   * Deactivate a subscription
   */
  async function deactivateSubscription(subscription: Subscription) {
    try {
      await apiPost(apiUrl('subscription_deactivate'), { subscription_id: subscription.id })
      await presentToast(translation('toast_subscription_deactivated'), 'success')

      // error
    } catch (error: any) {
      console.error('Error deactivating subscription:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /* Download an order invoice */
  async function downloadOrder(order: Order) {
    try {
      const fileInfo = await Filesystem.getUri({
        directory: Directory.Documents,
        path: `${order.created_at.replace(/[-:TZ.]/g, '').slice(0, 14)}.pdf`,
      })

      await FileTransfer.downloadFile({
        url: apiUrl('order_invoice', order.id),
        path: fileInfo.uri,
        progress: false,
      })

      // error
    } catch (error: any) {
      console.error('Error downloading invoice:', error)
      await presentToast(error.message, 'danger')
    }
  }

  return {
    reactivateSubscription,
    createOrder,
    getOrders,
    getSubscriptions,
    deactivateSubscription,
    downloadOrder,
  }
}
