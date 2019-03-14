function beforeSteps() {
  cy.visit( '/' );
}

describe( 'The index page in the logged out state', () => {
  before( () => beforeSteps() )

  it( 'Renders with the header', () => {
    cy.get( '[data-cy="header"]' ).should( 'be.visible' )
  })

  it( 'Renders with the footer', () => {
    cy.get( '[data-cy="footer"]' ).should( 'be.visible' )
  })

  it( 'Has a log in button', () => {
    cy.get( '[data-cy="button-log-in"]' ).should( 'be.visible' )
  })

  it( 'Has a sign up button', () => {
    cy.get( '[data-cy="button-sign-up"]' ).should( 'be.visible' )
  })
})

describe( 'The index page title', () => {
  before( () => beforeSteps() )

  it( 'Is "Memories App" with no delimitters or other content', () => {
    cy.title().should( 'eq', 'Memories App' )
  })
})

describe( 'The log in button', () => {
  before( () => beforeSteps() )

  it( 'Routes to the log in page', () => {
    cy.get( '[data-cy="button-log-in"]' ).click()

    cy.url().should( 'include', '/login' )
  })
})

describe( 'The sign up button', () => {
  before( () => beforeSteps() )

  it( 'Routes to the sign up page', () => {
    cy.get( '[data-cy="button-sign-up"]' ).click()

    cy.url().should( 'include', '/signup' )
  })
})

