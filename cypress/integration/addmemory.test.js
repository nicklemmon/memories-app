/// <reference types="Cypress" />

describe('The add memory page', () => {
  beforeEach(() => {
    cy.login()

    cy.server()
    cy.fixture('add-memory.json').as('addMemoryRes')
    cy.route({
      url: 'https://parseapi.back4app.com/classes/memory',
      method: 'POST',
      status: 201,
      response: '@addMemoryRes',
    })

    cy.visit('/addmemory')
  })

  it('renders with a relevant page title', () => {
    cy.title().should('include', 'Add a Memory')
    cy.findByText('Add a Memory').should('be.visible')
  })

  it('renders with a title, date, and summary fields', () => {
    cy.findByLabelText('Title').should('be.visible')
    cy.findByLabelText('Memory Date').should('be.visible')
    cy.findByLabelText('Summary').should('be.visible')
  })

  it('renders with "Add Tag" and "Add Memory" buttons', () => {
    cy.findByText('Add Tag').should('be.visible')
    cy.findByText('Add Memory').should('be.visible')
  })

  it('submits new memories and redirects the user to a success page', () => {
    cy.findByLabelText('Title').type('This is a fake title')
    cy.findByLabelText('Summary').type('This is a fake summary')
    cy.findByLabelText('Memory Date').type('2020-01-02')
    cy.findByText('Add Tag').click()
    cy.findByLabelText('Tag 1').type('Fake Tag')
    cy.findByText('Add Memory').click()

    cy.title().should('include', 'Memory Added')
    cy.findAllByText('Memory successfully added').should('be.visible')
    cy.findByText('This is a fake title')
    cy.findByText('This is a fake summary')
    cy.findByText('01/02/2020').should('be.visible')
    cy.findByText('Fake Tag').should('be.visible')
    cy.findByText('Add Another Memory').should('have.attr', 'href', '/addmemory')
    cy.findByText('View Memories').should('have.attr', 'href', '/memories')
  })

  describe('the add tag button and subsequent tag fields', () => {
    it('adds tag fields and delete buttons when the user chooses to add additional tags', () => {
      cy.findByText('Add Tag').click()

      cy.findByLabelText('Tag 1').should('be.visible')
      cy.findByText('Delete').should('be.visible')

      cy.findByText('Add Tag').should('not.be.visible')

      cy.findByText('Add Another Tag').click()

      cy.findByLabelText('Tag 2').should('be.visible')
      cy.queryAllByText('Delete').should('have.length', 2)

      cy.findByText('Add Another Tag').click()

      cy.findByLabelText('Tag 3').should('be.visible')
      cy.queryAllByText('Delete').should('have.length', 3)

      cy.findByText('Add Another Tag').should('not.be.visible')
    })

    it('removes relevant tag fields by using the delete buttons', () => {
      cy.findByText('Add Tag').click()
      cy.findByText('Add Another Tag').click()
      cy.findByText('Add Another Tag').click()

      cy.findByLabelText('Tag 1').should('be.visible')
      cy.findByLabelText('Tag 2').should('be.visible')
      cy.findByLabelText('Tag 3').should('be.visible')

      cy.queryAllByText('Delete')
        .first()
        .click()

      cy.findByLabelText('Tag 3').should('not.be.visible')

      cy.queryAllByText('Delete')
        .first()
        .click()

      cy.findByLabelText('Tag 2').should('not.be.visible')

      cy.queryAllByText('Delete')
        .first()
        .click()

      cy.findByLabelText('Tag 1').should('not.be.visible')
    })
  })
})
