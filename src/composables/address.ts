import { Address } from '$/types'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { AddressSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

/**
 * Use this composable to do address related queries
 */
export function useAddress() {
  /**
   * Create Address Form Fields
   */
  async function createFields() {
    return [
      {
        element: 'input',
        name: 'first_name',
        label: translation('first_name'),
      },
      {
        element: 'input',
        name: 'last_name',
        label: translation('last_name'),
      },
      {
        element: 'input',
        name: 'street_address',
        label: translation('street_address'),
      },
      {
        element: 'input',
        name: 'extended_address',
        label: `${translation('extended_address')} (${translation('optional')})`,
      },
      {
        element: 'input',
        name: 'locality',
        label: translation('locality'),
      },
      {
        element: 'input',
        name: 'postal_code',
        label: translation('postal_code'),
        type: 'number',
      },
      {
        element: 'select',
        name: 'country_code',
        label: translation('country_code'),
        items: await fetch('/country_codes.json').then((res) => res.json()),
        itemValueKey: 'code',
        itemLabelKey: 'name',
      },
    ] as FormField[]
  }

  /**
   * Get all addresses
   */
  async function get() {
    const addresses: Address[] = [
      {
        id: 1,
        index: 0,
        first_name: 'John',
        last_name: 'Doe',
        street_address: '123 Main Street',
        extended_address: 'Apt 4B',
        locality: 'New York',
        postal_code: 10001,
        country_code: 'US',
      },
      {
        id: 2,
        index: 1,
        first_name: 'Marie',
        last_name: 'Curie',
        street_address: '456 Rue de la République',
        extended_address: '',
        locality: 'Paris',
        postal_code: 75001,
        country_code: 'FR',
      },
    ]

    return addresses ?? []
  }

  /**
   * Reorder the addresses
   *
   * @param items Items in new order
   */
  async function reorder(items: Address[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
  }

  /**
   * Create a new address
   *
   * @param state The state that tracks the new values
   */
  async function create(state: AddressSchema) {
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a address
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: AddressSchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a address
   *
   * @param id The id of the address record
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
    reorder,
    create,
    modify,
    remove,
  }
}
