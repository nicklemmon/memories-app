// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

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
  cy.get('[data-cy="button-log-in"]').click()
  cy.wait('@loginPost')
})
