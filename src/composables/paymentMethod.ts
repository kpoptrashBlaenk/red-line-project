import apiUrl from '$/constants/apiUrl'
import { PaymentMethod } from '$/types'
import { FormField } from '@/types'
import { apiDelete, apiGet, apiPost } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { PaymentMethodSchema } from '@/utils/schemas'
import { getStripe } from '@/utils/stripe'
import translation from '@/utils/translation'

/**
 * Use this composable to do payment method related queries
 */
export function usePaymentMethod() {
  /**
   * Create Payment Method Form Fields
   */
  async function createFields() {
    const stripe = await getStripe()

    return [
      {
        element: 'input',
        name: 'name',
        label: translation('name'),
      },
      {
        element: 'payment',
        name: 'cardNumber',
        label: translation('card_number'),
        type: 'cardNumber',
        instance: stripe,
      },
      {
        element: 'payment',
        name: 'cardExpiry',
        label: translation('expiration'),
        type: 'cardExpiry',
        instance: stripe,
      },
      {
        element: 'payment',
        name: 'cardCvc',
        label: translation('cvv'),
        type: 'cardCvc',
        instance: stripe,
      },
    ] as FormField[]
  }

  /**
   * Get all payment methods
   */
  async function get() {
    try {
      const methods = await apiGet<PaymentMethod[]>(apiUrl('payment_method_get_all'))
      return methods ?? []

      // error
    } catch (error: any) {
      console.error('Error fetching payment methods:', error)
      await presentToast(error.message, 'danger')
      return []
    }
  }

  /**
   * Create a new payment method
   *
   * @param state The state that tracks the new values
   */
  async function create(state: PaymentMethodSchema) {
    try {
      await apiPost<PaymentMethod>(apiUrl('payment_method_create'), {
        token: state.token,
        name: state.name,
      })
      await presentToast(translation('toast_added'), 'success')

      // error
    } catch (error: any) {
      console.error('Error creating payment method:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Delete a payment method
   *
   * @param id The id of the payment method record
   */
  async function remove(id: number) {
    try {
      await apiDelete(apiUrl('payment_method_delete', id))
      await presentToast(translation('toast_deleted'), 'success')

      // error
    } catch (error: any) {
      console.error('Error deleting payment method:', error)
      await presentToast(error.message, 'danger')
    }
  }

  // return all functions
  return {
    createFields,
    get,
    create,
    remove,
  }
}
