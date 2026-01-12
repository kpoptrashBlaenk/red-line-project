import ImageComponent from '@/components/forms/ImageComponent.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import imageComponentProps from '../../fixtures/forms/imageComponent.props'

describe('ImageComponent.vue', () => {
  it('shows initial value', async () => {
    const wrapper = mount(
      ImageComponent,
      imageComponentProps({
        state: {
          test: ['a.jpg', 'b.jpg'],
        },
      }),
    )

    // find imgs
    const imageElements = wrapper.findAll('img')

    // expect array of 2
    expect(imageElements.length).toBe(2)

    // expect src to be correct
    expect(imageElements[0].attributes('src')).toBe('a.jpg')
    expect(imageElements[1].attributes('src')).toBe('b.jpg')
  })
})
