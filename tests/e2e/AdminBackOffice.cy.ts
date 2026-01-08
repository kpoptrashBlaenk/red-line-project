describe('Admin Admin Back Office', () => {
  beforeEach(() => {
    cy.visit('/admin')
  })

  // Promotion Carousel
  it('should update the home promotion carousel', () => {
    // open accordion & slide first item
    cy.get('ion-accordion').eq(0).click()
    cy.get('ion-accordion').eq(0).find('ion-item-sliding').first().find('ion-button').click()

    // open edit
    cy.get('ion-accordion').eq(0).find('ion-item-option').first().click()

    // modify inputs
    cy.get('ion-input').each(($el) => {
      cy.wrap($el).clear().type('test')
    })

    // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('not.be.visible')
  })

  // Home Text Box
  it('should update the home text box', () => {
    // open accordion & slide
    cy.get('ion-accordion').eq(1).click()
    cy.get('ion-accordion').eq(1).find('ion-button').click()

    // open edit
    cy.get('ion-accordion').eq(1).find('ion-item-option').click()

    // modify inputs
    cy.get('ion-textarea').each(($el) => {
      cy.wrap($el).clear().type('test')
    })

    // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('not.be.visible')
  })

  // Categories
  it('should update the categories', () => {
    // open accordion & slide first item
    cy.get('ion-accordion').eq(2).click()
    cy.get('ion-accordion').eq(2).find('ion-item-sliding').first().find('ion-button').click()

    // open edit
    cy.get('ion-accordion').eq(2).find('ion-item-option').first().click()

    // modify inputs
    cy.get('ion-input').each(($el) => {
      cy.wrap($el).clear().type('test')
    })

    // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('not.be.visible')
  })

  // Products
  it('should update the products', () => {
    // open accordion & slide first item
    cy.get('ion-accordion').eq(3).click()
    cy.get('ion-accordion').eq(3).find('ion-item-sliding').first().find('ion-button').click()

    // open edit
    cy.get('ion-accordion').eq(3).find('ion-item-option').first().click()

    // modify inputs
    cy.get('ion-input').each(($el) => {
      cy.wrap($el).clear().type('test')
    })

    cy.get('ion-input').last().clear().type('55')

    cy.get('ion-textarea').each(($el) => {
      cy.wrap($el).clear().type('test')
    })

    cy.get('ion-toggle').each(($el) => {
      cy.wrap($el).click()
    })

    cy.get('ion-select').each(($el) => {
      cy.wrap($el).click()
      cy.get('ion-alert').find('.alert-radio-button, .alert-checkbox-button').last().click()
      cy.get('ion-alert').find('button').last().click()
    })

    // // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('not.be.visible')
  })

  // Characteristics
  it('should update the characteristics', () => {
    // open accordion & slide first item
    cy.get('ion-accordion').eq(4).click()
    cy.get('ion-accordion').eq(4).find('ion-item-sliding').first().find('ion-button').click()

    // open edit
    cy.get('ion-accordion').eq(4).find('ion-item-option').first().click()

    // modify inputs
    cy.get('ion-input').each(($el) => {
      cy.wrap($el).clear().type('test')
    })

    cy.get('ion-select').each(($el) => {
      cy.wrap($el).click()
      cy.get('ion-alert').find('.alert-radio-button, .alert-checkbox-button').last().click()
      cy.get('ion-alert').find('button').last().click()
    })

    // // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('not.be.visible')
  })
})
