function beforeSteps() {
  cy.visit( '/login' )
}

describe( 'The log in page in the logged out state', () => {
  before( () => beforeSteps() )

  it( 'Has a username form group', () => {
    cy.get( '[data-cy="form-group-username"]' ).should( 'be.visible' )
  })

  it( 'Has a password form group', () => {
    cy.get( '[data-cy="form-group-password"]' ).should( 'be.visible' )
  })

  it( 'Has a sign up link', () => {
    cy.get( '[data-cy="link-sign-up"]' ).should( 'be.visible' )
  })
})
