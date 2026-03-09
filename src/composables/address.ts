import { Address } from '$/types'
import { addressFixtures } from '@/constants/fixtures'
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
        name: 'region',
        label: translation('region'),
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
      {
        element: 'phone',
        name: 'phone',
        label: translation('phone'),
      },
    ] as FormField[]
  }

  /**
   * Get all addresses
   */
  async function get() {
    const addresses: Address[] = Object.values(addressFixtures)

    return addresses ?? []
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
    create,
    modify,
    remove,
  }
}
