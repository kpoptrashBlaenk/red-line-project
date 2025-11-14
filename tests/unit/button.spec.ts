import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { ButtonProps } from '@/types'
import { IonButton, IonIcon } from '@ionic/vue'
import { mount } from '@vue/test-utils'
import { chevronForward } from 'ionicons/icons'
import { describe, expect } from 'vitest'

describe('ButtonComponent.vue', () => {
  const props: ButtonProps = {
    label: 'Click Me',
    color: 'primary',
    fill: 'solid',
    icon: chevronForward,
  }

  test('renders label', () => {
    const wrapper = mount(ButtonComponent, { props: { props } })

    expect(wrapper.text()).toContain('Click Me')
  })

  test('passes color and fill props to IonButton', () => {
    const wrapper = mount(ButtonComponent, { props: { props } })
    const ionButton = wrapper.findComponent(IonButton)
    expect(ionButton.props('color')).toBe('primary')
    expect(ionButton.props('fill')).toBe('solid')
  })

  test('renders IonIcon correctly', () => {
    const wrapper = mount(ButtonComponent, { props: { props } })
    const ionIcon = wrapper.findComponent(IonIcon)
    expect(ionIcon.exists()).toBe(true)
    expect(ionIcon.props('icon')).toBe(chevronForward)
  })
})
