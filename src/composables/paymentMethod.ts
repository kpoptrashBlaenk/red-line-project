import { PaymentMethod } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { PaymentMethodSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do payment method related queries
 */
export function usePaymentMethod() {
  /**
   * Create Payment Method Form Fields
   */
  async function createFields() {
    return [
      {
        element: 'input',
        name: 'name',
        label: translation('name'),
      },
      {
        element: 'input',
        name: 'card_number',
        label: translation('card_number'),
        type: 'number',
      },
      {
        element: 'input',
        name: 'expiration',
        label: translation('expiration'),
      },
      {
        element: 'input',
        name: 'cvv',
        label: translation('cvv'),
        type: 'number',
      },
    ] as FormField[]
  }

  /**
   * Get all payment methods
   */
  async function get() {
    const paymentMethods: PaymentMethod[] = [
      {
        id: 1,
        name: 'John Doe',
        card_number: 4242424242424242,
        expiration: '12/28',
        cvv: 123,
      },
      {
        id: 2,
        name: 'Marie Curie',
        card_number: 5555555555554444,
        expiration: '07/27',
        cvv: 456,
      },
    ]

    return paymentMethods ?? []
  }

  /**
   * Create a new payment method
   *
   * @param state The state that tracks the new values
   */
  async function create(state: PaymentMethodSchema) {
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a payment method
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: PaymentMethodSchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a payment method
   *
   * @param id The id of the payment method record
   */
  async function remove(id: number) {
    // api request
    id

    await presentToast(translation('toast_deleted'), 'success', checkmarkCircleOutline)
  }

  // return all functions
  return {
    createFields,
    get,
    create,
    modify,
    remove,
  }
}
