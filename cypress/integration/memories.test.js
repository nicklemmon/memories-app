/// <reference types="Cypress" />

describe('the memories page', () => {
  beforeEach(() => {
    cy.login()
    cy.server()
    cy.fixture('memory.json').as('memoriesGetRes')

    cy.route({
      url: 'https://parseapi.back4app.com/classes/memory',
      method: 'POST',
      response: '@memoriesGetRes',
    }).as('memoriesGet')

    cy.visit('/memories')
  })

  it('renders requested memories, some with missing data', () => {
    cy.findByText('Memory 1').should('be.visible')
    cy.findByText('Memory 1 summary').should('be.visible')
    cy.findByText('memory 1 tag').should('be.visible')
    cy.findByText('Memory 2').should('be.visible')
    cy.findByText('Memory 2 summary').should('be.visible')
    cy.findByText('memory 2 tag').should('be.visible')
    cy.findByText('Memory 3').should('be.visible')
    cy.findByText('Memory 3 summary').should('be.visible')
    cy.findAllByText('memory 3 tag').should('have.length', 2)
    cy.findByText('Memory 4').should('be.visible')
    cy.findByText('Memory 4 summary').should('be.visible')
    cy.queryByText('memory 4 tag').should('not.be.visible')
    cy.findByText('Memory 5').should('be.visible')
    cy.queryByText('Memory 5 summary').should('not.be.visible')
    cy.findByText('memory 5 tag').should('be.visible')
  })

  it("renders an edit modal when the user clicks on a memory's edit button", () => {
    cy.queryAllByText('Edit')
      .first()
      .click({ force: true })

    cy.findByText('Edit Memory').should('be.visible')
    cy.findByLabelText('Title').should('have.value', 'Memory 1')
    cy.findByLabelText('Memory Date').should('have.value', '02/08/2019')
    cy.findByLabelText('Summary').should('have.value', 'Memory 1 summary')
  })

  it("renders an delete modal when the user clicks on a memory's delete button", () => {
    cy.queryAllByText('Delete')
      .first()
      .click({ force: true })

    cy.findByText('Delete "Memory 1"?').should('be.visible')
  })

  it('deletes a memory when clicking on the delete button', () => {
    cy.server()
    cy.fixture('delete-memory.json').as('deleteMemoryRes')
    cy.route({
      method: 'POST',
      url: 'https://parseapi.back4app.com/classes/memory/abc',
      response: '@deleteMemoryRes',
    })

    cy.queryAllByText('Delete')
      .first()
      .click({ force: true })

    cy.get('[data-cy="modal-btn-primary"]').click()

    cy.queryByText('Delete "Memory 1"?').should('not.be.visible')
  })

  it('closes the cancel modal when the user clicks "Cancel"', () => {
    cy.queryAllByText('Delete')
      .first()
      .click({ force: true })

    cy.findByText('Cancel').click()

    cy.queryByText('Delete "Memory 1"?').should('not.be.visible')
  })
})
