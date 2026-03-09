import ToggleComponent from '@/components/forms/ToggleComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import toggleComponentProps from '../../fixtures/forms/toggleComponent.props'

describe('ToggleComponent.vue', () => {
  it('shows initial value', async () => {
    const wrapper = mount(ToggleComponent, toggleComponentProps({ state: { test: true } }))
    const ionToggle = wrapper.findComponent({ name: 'IonToggle' })

    expect(ionToggle.element.checked).toBe(true)
  })

  it('updates state on input', async () => {
    const wrapper = mount(ToggleComponent, toggleComponentProps())
    const ionToggle = wrapper.findComponent({ name: 'IonToggle' })

    // change value
    await ionToggle.setValue(true)

    // expect state to be updated
    expect(wrapper.props().state.test).toBe(true)
  })
})
