describe('Navigation', () => {
  it('routing twice forward then once backwards, brings us to home', () => {
    // go & assert home
    cy.visit('/')
    cy.url().should('eq', `${Cypress.config().baseUrl}/home`)

    // go first category
    cy.get('[data-cy="home-category-card-1"]').click()

    // open menu
    cy.get('[data-cy="menu-button"]').last().click()

    // go admin
    cy.get('[data-cy="admin-menu-item"]').click()

    // go back
    cy.go('back')

    // assert home
    cy.url().should('eq', `${Cypress.config().baseUrl}/home`)
  })
})
