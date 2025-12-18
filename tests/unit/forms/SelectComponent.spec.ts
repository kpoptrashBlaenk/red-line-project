import SelectComponent from '@/components/forms/SelectComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import selectComponentMultipleProps from '../../fixtures/forms/selectComponent.multiple.props'
import selectComponentSingleProps from '../../fixtures/forms/selectComponent.single.props'

vi.mock('@/utils/translation', () => ({
  default: (key: string) => key,
}))

describe('SelectComponent.vue', () => {
  it('shows initial value', async () => {
    const wrapper = mount(SelectComponent, selectComponentSingleProps({ state: { test: 1 } }))
    const ionSelect = wrapper.findComponent({ name: 'IonSelect' })

    expect(ionSelect.element.value).toBe(1)
  })

  it('updates state on input', async () => {
    const wrapper = mount(SelectComponent, selectComponentSingleProps())
    const ionSelect = wrapper.findComponent({ name: 'IonSelect' })

    // change value
    await ionSelect.setValue(1)

    // expect state to be updated
    expect(wrapper.props().state.test).toBe(1)
  })

  it('show error when field is touched and empty, but remove it when value is entered', async () => {
    const wrapper = mount(SelectComponent, selectComponentSingleProps())
    const ionSelect = wrapper.findComponent({ name: 'IonSelect' })

    // input empty value and blur
    await ionSelect.vm.$emit('ionBlur')

    // expect error to be shown
    expect(ionSelect.classes()).toContain('ion-touched')
    expect(ionSelect.classes()).toContain('ion-invalid')

    // input valid value
    await ionSelect.setValue(1)
    await ionSelect.vm.$emit('ionChange') // trigger change but set value with set value

    // expect error to be removed
    expect(ionSelect.classes()).not.toContain('ion-invalid')
  })

  it('supports multiple selection', async () => {
    const wrapper = mount(SelectComponent, selectComponentMultipleProps())
    const ionSelect = wrapper.findComponent({ name: 'IonSelect' })

    // change value
    await ionSelect.setValue([1, 2])
    await ionSelect.vm.$emit('ionBlur')

    // expect state to be updated
    expect(wrapper.props().state.test).toEqual([1, 2])

    // expect to be valid
    expect(ionSelect.classes()).not.toContain('ion-invalid')
  })
})
