function beforeSteps() {
  cy.visit( '/signup' )
}

describe( 'The sign up page in its logged out state', () => {
  before( () => beforeSteps() )

  it( 'Has a username form group', () => {
    cy.get( '[data-automation="form-group-username"]' ).should( 'be.visible' )
  })

  it( 'Has an email form group', () => {
    cy.get( '[data-automation="form-group-email"]' ).should( 'be.visible' )
  })

  it( 'Has a password form group', () => {
    cy.get( '[data-automation="form-group-password"]' ).should( 'be.visible' )
  })
})
