import { Characteristic, CharacteristicType } from '$/types'
import { characteristicFixtures } from '@/constants/fixtures'
import { FormField } from '@/types'
import presentToast from '@/utils/presentToast'
import { CharacteristicSchema } from '@/utils/schemas'
import translation from '@/utils/translation'
import { checkmarkCircleOutline } from 'ionicons/icons'

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
        items: CharacteristicType,
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
   * Get all characteristics
   */
  async function get(type?: CharacteristicType) {
    const characteristics: Characteristic[] = Object.values(characteristicFixtures)

    return type ? characteristics.filter((characteristic) => characteristic.type === type) : characteristics
  }

  /**
   * Find characteristics by id
   */
  async function findMultiple(ids: number[]) {
    return Object.values(characteristicFixtures).filter((characteristic) => ids.includes(characteristic.id))
  }

  /**
   * Create a new characteristic
   *
   * @param state The state that tracks the new values
   */
  async function create(state: CharacteristicSchema) {
    // api request
    state

    await presentToast(translation('toast_added'), 'success', checkmarkCircleOutline)
  }

  /**
   * Modify a characteristic
   *
   * @param id The id of the record to modify
   * @param state The state that tracks the new values
   */
  async function modify(id: number, state: CharacteristicSchema) {
    // api request
    id
    state

    await presentToast(translation('toast_modified'), 'success', checkmarkCircleOutline)
  }

  /**
   * Delete a characteristic
   *
   * @param id The id of the characteristic record
   */
  async function remove(id: number) {
    // api request
    id

    await presentToast(translation('toast_deleted'), 'success', checkmarkCircleOutline)
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
