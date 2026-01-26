import InputComponent from '@/components/forms/InputComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import inputComponentNumberProps from '../../fixtures/forms/inputComponent.number.props'
import inputComponentTextProps from '../../fixtures/forms/inputComponent.text.props'

describe('InputComponent.vue', () => {
  it('shows initial value', async () => {
    const wrapper = mount(InputComponent, inputComponentTextProps({ state: { test: 'Test' } }))
    const ionInput = wrapper.findComponent({ name: 'IonInput' })

    expect(ionInput.vm.value).toBe('Test')
  })

  it('updates state on input', async () => {
    const wrapper = mount(InputComponent, inputComponentTextProps())
    const ionInput = wrapper.findComponent({ name: 'IonInput' })

    // input value
    await ionInput.vm.$emit('ionInput', { detail: { value: 'Test' } })

    // expect state to be updated
    expect(wrapper.props().state.test).toBe('Test')
  })

  it('show error when field is touched and empty, but remove it when value is entered', async () => {
    const wrapper = mount(InputComponent, inputComponentTextProps())
    const ionInput = wrapper.findComponent({ name: 'IonInput' })

    // input empty value and blur
    await ionInput.vm.$emit('ionInput', { detail: { value: '' } })
    await ionInput.vm.$emit('ionBlur')

    // expect error to be shown
    expect(ionInput.classes()).toContain('ion-touched')
    expect(ionInput.classes()).toContain('ion-invalid')

    // input valid value
    await ionInput.vm.$emit('ionInput', { detail: { value: 'Test' } })

    // expect error to be removed
    expect(ionInput.classes()).not.toContain('ion-invalid')
  })

  it('tests number input', async () => {
    const wrapper = mount(InputComponent, inputComponentNumberProps())
    const ionInput = wrapper.findComponent({ name: 'IonInput' })

    // input text value and blur
    await ionInput.vm.$emit('ionInput', { detail: { value: 'Test' } })
    await ionInput.vm.$emit('ionBlur')

    // expect error to be shown
    expect(ionInput.classes()).toContain('ion-touched')
    expect(ionInput.classes()).toContain('ion-invalid')

    // input valid value
    await ionInput.vm.$emit('ionInput', { detail: { value: '69' } })

    // expect error to be removed
    expect(ionInput.classes()).not.toContain('ion-invalid')
  })
})
