import TextareaComponent from '@/components/forms/TextAreaComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import textAreaComponentProps from '../../fixtures/forms/textAreaComponent.props'

describe('TextareaComponent.vue', () => {
  it('shows initial value', async () => {
    const wrapper = mount(TextareaComponent, textAreaComponentProps({ state: { test: 'Test' } }))
    const ionTextarea = wrapper.findComponent({ name: 'IonTextarea' })

    expect(ionTextarea.element.value).toBe('Test')
  })

  it('updates state on input', async () => {
    const wrapper = mount(TextareaComponent, textAreaComponentProps())
    const ionTextarea = wrapper.findComponent({ name: 'IonTextarea' })

    // input value
    await ionTextarea.setValue('Test')

    // expect state to be updated
    expect(wrapper.props().state.test).toBe('Test')
  })

  it('show error when field is touched and empty, but remove it when value is entered', async () => {
    const wrapper = mount(TextareaComponent, textAreaComponentProps())
    const ionTextarea = wrapper.findComponent({ name: 'IonTextarea' })

    // input empty value and blur
    await ionTextarea.setValue('')
    await ionTextarea.vm.$emit('ionBlur')

    // expect error to be shown
    expect(ionTextarea.classes()).toContain('ion-touched')
    expect(ionTextarea.classes()).toContain('ion-invalid')

    // input valid value
    // await ionTextarea.setValue('Test')
    await ionTextarea.vm.$emit('ionInput') // trigger input but set value with set value

    // expect error to be removed
    expect(ionTextarea.classes()).not.toContain('ion-invalid')
  })
})
