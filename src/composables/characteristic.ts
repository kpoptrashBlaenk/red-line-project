import apiUrl from '$/constants/apiUrl'
import { Characteristic, CharacteristicType } from '$/types'
import { FormField } from '@/types'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/api'
import presentToast from '@/utils/presentToast'
import { CharacteristicSchema } from '@/utils/schemas'
import translation from '@/utils/translation'

/**
 * Use this composable to do characteristic related queries
 */
export function useCharacteristic() {
  /**
   * Create Characteristic Form Fields
   */
  function createFields() {
    return [
      // en
      {
        element: 'divider',
        label: translation('english'),
      },
      {
        element: 'input',
        name: 'name_en',
        label: translation('name'),
      },

      // fr
      {
        element: 'divider',
        label: translation('french'),
      },
      {
        element: 'input',
        name: 'name_fr',
        label: translation('name'),
      },

      // general
      {
        element: 'divider',
        label: translation('general'),
      },
      {
        element: 'select',
        items: Object.values(CharacteristicType).map((type) => ({ label: type, value: type })),
        itemLabelKey: 'label',
        itemValueKey: 'value',
        name: 'type',
        label: translation('type'),
        multiple: false,
      },
    ] as FormField[]
  }

  /**
   * Flatten characteristic to fit into state for forms
   *
   * @param characteristic Selected characteristic
   */
  function flatten(characteristic: Characteristic) {
    return {
      name_en: characteristic.name.en,
      name_fr: characteristic.name.fr,
      type: characteristic.type,
    }
  }

  /**
   * Get all characteristics or by type apparently
   */
  async function get(type?: CharacteristicType) {
    try {
      // get characteristics
      const characteristics = type
        ? await apiGet<Characteristic[]>(apiUrl('characteristic_get_by_type', type))
        : await apiGet<Characteristic[]>(apiUrl('characteristic_get_all'))

      // check if empty
      if (!characteristics || characteristics.length === 0) throw new Error(translation('toast_characteristic_none'))

      // return
      return characteristics

      // error
    } catch (error: any) {
      console.error('Error fetching characteristics:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Find characteristics by id
   */
  async function findMultiple(ids: number[]) {
    try {
      // get characteristics
      const characteristics = await apiPost<Characteristic[]>(apiUrl('characteristic_get_by_ids'), { ids })

      // check if empty
      if (!characteristics || characteristics.length === 0) throw new Error(translation('toast_characteristic_none'))

      // return
      return characteristics

      // error
    } catch (error: any) {
      console.error('Error fetching characteristic:', error)
      await presentToast(error.message, 'danger')

      return []
    }
  }

  /**
   * Create a new characteristic
   *
   * @param state The state that tracks the new values
   */
  async function create(state: CharacteristicSchema) {
    try {
      // create characteristic
      await apiPost(apiUrl('characteristic_create'), state)

      // toast
      await presentToast(translation('toast_added'), 'success')

      // error
    } catch (error: any) {
      console.error('Error fetching characteristics:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Modify a characteristic
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: CharacteristicSchema) {
    try {
      // create characteristic
      await apiPut(apiUrl('characteristic_update', id), state)

      // toast
      await presentToast(translation('toast_modified'), 'success')

      // error
    } catch (error: any) {
      console.error('Error fetching characteristics:', error)
      await presentToast(error.message, 'danger')
    }
  }

  /**
   * Delete a characteristic
   *
   * @param id The id of the characteristic record
   */
  async function remove(id: number) {
    try {
      // create characteristic
      await apiDelete(apiUrl('characteristic_delete', id))

      // toast
      await presentToast(translation('toast_deleted'), 'success')

      // error
    } catch (error: any) {
      console.error('Error deleting characteristic:', error)
      await presentToast(error.message, 'danger')
    }
  }

  // return all functions
  return {
    createFields,
    flatten,
    get,
    findMultiple,
    create,
    modify,
    remove,
  }
}
