import ButtonComponent from '@/components/ui/ButtonComponent.vue'
import { ButtonProps } from '@/types'
import { mount } from '@vue/test-utils'
import { chevronForward } from 'ionicons/icons'
import { describe, it } from 'vitest'

describe('button hover animation', () => {
  it('icon moves on hover', () => {
    const props: ButtonProps = {
      label: 'Click Me',
      color: 'primary',
      fill: 'solid',
      icon: chevronForward,
    }

    mount(ButtonComponent, { props: { props } })

    cy.get('.icon').as('icon')

    cy.get('@icon').then(($icon) => {
      const initial = $icon[0].getBoundingClientRect().x

      cy.get('ion-button').trigger('mouseover')

      cy.wait(200)

      cy.get('@icon').then(($iconHover) => {
        const hoverX = $iconHover[0].getBoundingClientRect().x
        expect(hoverX).to.be.greaterThan(initial)
      })
    })
  })
})
