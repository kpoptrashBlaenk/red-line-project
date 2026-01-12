describe('Admin Admin Back Office', () => {
  beforeEach(() => {
    cy.visit('/admin')
  })

  // Add
  it('should be able to add a product', () => {
    // open accordion & click add
    cy.get('ion-accordion').eq(3).click()
    cy.get('ion-accordion').eq(3).find('[data-cy="admin-add-button"]').click()

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

    cy.get('ion-button').eq(30).click()

    // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('be.visible')
    cy.contains('Please fill out this field').should('exist')

    // can't mock file upload here, so file missing error is what we want
  })

  // Update
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

    // submit & check success
    cy.get('[data-cy="form-modal-submit"]').click()
    cy.get('ion-modal').should('not.be.visible')
  })

  // Delete
  it('should be able to delete a record', () => {
    // open accordion & slide first item
    cy.get('ion-accordion').eq(3).click()
    cy.get('ion-accordion').eq(3).find('ion-item-sliding').first().find('ion-button').click()

    // click edit
    cy.get('ion-accordion').eq(3).find('ion-item-option').eq(1).click()

    // delete & check success
    cy.get('ion-alert').find('button').last().click()
    cy.get('ion-alert').should('not.be.visible')
  })
})
