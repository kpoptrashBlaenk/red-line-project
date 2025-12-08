import { Characteristic } from '$/types'
import characteristicTypes from '@/constants/characteristicTypes'
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
        items: characteristicTypes,
        itemLabelKey: 'key',
        itemLabelValue: 'value',
        name: 'type',
        label: translation('type'),
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
  async function get() {
    const characteristics: Characteristic[] = [
      { id: 1, name: { en: 'High Performance', fr: 'Haute performance' }, type: 'performance' },
      { id: 2, name: { en: 'Optimized', fr: 'Optimisé' }, type: 'performance' },
      { id: 3, name: { en: 'Low Latency', fr: 'Faible latence' }, type: 'performance' },

      { id: 4, name: { en: 'Highly Scalable', fr: 'Haute scalabilité' }, type: 'scalability' },
      { id: 5, name: { en: 'Cloud Ready', fr: 'Prêt pour le cloud' }, type: 'scalability' },
      { id: 6, name: { en: 'Multi-Tenant', fr: 'Multi-locataire' }, type: 'scalability' },

      { id: 7, name: { en: 'Enterprise Level', fr: 'Niveau entreprise' }, type: 'level' },
      { id: 8, name: { en: 'SMB Level', fr: 'Niveau PME' }, type: 'level' },
      { id: 9, name: { en: 'Basic Level', fr: 'Niveau de base' }, type: 'level' },
    ]

    return characteristics ?? []
  }

  /**
   * Reorder the characteristics
   *
   * @param items Items in new order
   */
  async function reorder(items: Characteristic[]) {
    // api request
    items

    await presentToast(translation('toast_reordered'), 'success', checkmarkCircleOutline)
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
    reorder,
    create,
    modify,
    remove,
  }
}
