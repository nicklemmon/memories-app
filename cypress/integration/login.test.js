function beforeSteps() {
  cy.visit('/login')
}

describe('The log in page in the logged out state', () => {
  before(() => beforeSteps())

  it('Has a log in page title and heading', () => {
    cy.title().should('eq', 'Log In | Memories App')
    cy.findByRole('heading', { name: 'Log In' }).should('be.visible')
  })

  it('renders with relevant form elements', () => {
    cy.findByLabelText('Username').should('be.visible')
    cy.findByLabelText('Password').should('be.visible')
    cy.findByRole('button', { name: 'Log In' }).should('be.visible')
  })
})
