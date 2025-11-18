import ButtonComponent from '@/components/ui/buttons/ButtonComponent.vue'
import { IonButton, IonIcon } from '@ionic/vue'
import { mount } from '@vue/test-utils'
import { chevronForward } from 'ionicons/icons'
import { describe, expect } from 'vitest'
import { defaultButtonComponentProps } from '../fixtures/buttonComponentProps'

describe('ButtonComponent.vue', () => {
  test('renders label', () => {
    const wrapper = mount(ButtonComponent, { props: defaultButtonComponentProps })

    expect(wrapper.text()).toContain('Click Me')
  })

  test('passes color and fill props to IonButton', () => {
    const wrapper = mount(ButtonComponent, { props: defaultButtonComponentProps })
    const ionButton = wrapper.findComponent(IonButton)
    expect(ionButton.props('color')).toBe('primary')
    expect(ionButton.props('fill')).toBe('solid')
  })

  test('renders IonIcon correctly', () => {
    const wrapper = mount(ButtonComponent, { props: defaultButtonComponentProps })
    const ionIcon = wrapper.findComponent(IonIcon)
    expect(ionIcon.exists()).toBe(true)
    expect(ionIcon.props('icon')).toBe(chevronForward)
  })
})
