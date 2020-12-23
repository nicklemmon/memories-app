import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: 'https://parseapi.back4app.com/login',
  }).as('loginPost')
  cy.visit('/login')
  cy.findByLabelText('Username').type(Cypress.env('USERNAME'))
  cy.findByLabelText('Password').type(Cypress.env('PASSWORD'))
  cy.findByRole('button', { name: 'Log In' }).click()
  cy.wait('@loginPost')
})
