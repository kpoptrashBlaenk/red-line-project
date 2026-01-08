describe('Search', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy="search-button"]').click()
  })

  it('searches products by text', () => {
    cy.get('[data-cy="searchbar"]').type('soc')
    cy.get('ion-modal ion-item').should('have.length', 2)
  })

  it('filters products by category', () => {
    cy.get('[data-cy="filter-button-category"]').click()
    cy.get('ion-checkbox').first().click()
    cy.get('[data-cy="filter-button-ok"]').click()

    cy.get('ion-modal ion-item').should('have.length', 2)
  })

  it('filters products by characteristic', () => {
    cy.get('[data-cy="filter-button-characteristic"]').click()
    cy.get('ion-checkbox').first().click()
    cy.get('[data-cy="filter-button-ok"]').click()

    cy.get('ion-modal ion-item').should('have.length', 2)
  })

  it('filters products by availability', () => {
    cy.get('[data-cy="filter-button-toggle"]').click()
    cy.get('ion-modal ion-item').should('have.length', 3)
  })
})
