import AdminPageGrid from '@/components/grids/AdminPageGrid.vue'
import SolidButton from '@/components/ui/buttons/SolidButton.vue'
import { adminPages } from '@/constants/adminPages'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import adminPageGridProps from '../../fixtures/grids/adminPageGrid.props'

vi.mock('@/utils/translation', () => ({
  default: (key: string) => key,
}))

describe('AdminPageGrid.vue', () => {
  it('shows one button per admin page', async () => {
    const wrapper = mount(AdminPageGrid, adminPageGridProps())

    const buttons = wrapper.findAllComponents(SolidButton)
    expect(buttons.length).toBe(Object.values(adminPages).length)
  })

  it('emits update:selected-page when clicked', async () => {
    const wrapper = mount(AdminPageGrid, adminPageGridProps())

    const button = wrapper.findAllComponents(SolidButton)[0]
    await button.trigger('click')

    expect(wrapper.emitted('update:selected-page')).toBeTruthy()
  })
})
