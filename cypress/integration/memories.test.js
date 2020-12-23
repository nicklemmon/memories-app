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

    cy.wait('@memoriesGet')
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
    cy.findByText('memory 4 tag').should('not.exist')
    cy.findByText('Memory 5').should('be.visible')
    cy.findByText('Memory 5 summary').should('not.exist')
    cy.findByText('memory 5 tag').should('be.visible')
  })

  it("renders an edit modal when the user clicks on a memory's edit button", () => {
    cy.findAllByText('Edit')
      .first()
      .click({ force: true })

    cy.findByText('Edit Memory').should('be.visible')
    cy.findByLabelText('Title').should('have.value', 'Memory 1')
    cy.findByLabelText('Summary').should('have.value', 'Memory 1 summary')
  })

  it("renders an delete modal when the user clicks on a memory's delete button", () => {
    cy.findAllByText('Delete')
      .first()
      .click({ force: true })

    cy.findByText('Delete Memory').should('be.visible')
  })

  it('deletes a memory when clicking on the delete button', () => {
    cy.fixture('delete-memory.json').as('deleteMemoryRes')
    cy.route({
      method: 'POST',
      url: 'https://parseapi.back4app.com/classes/memory/abc',
      response: '@deleteMemoryRes',
    }).as('deleteMemoryReq')

    cy.findAllByText('Delete')
      .first()
      .click({ force: true })

    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', { name: 'Delete' }).click()
    })

    cy.wait('@deleteMemoryReq')

    cy.findByRole('dialog').should('not.exist')
  })

  it('edits a memory when clicking on the edit button', () => {
    cy.fixture('edit-memory.json').as('editMemoryRes')
    cy.fixture('edited-memory.json').as('editedMemoryRes')

    cy.route({
      method: 'POST',
      url: 'https://parseapi.back4app.com/classes/memory/abc',
      response: '@editMemoryRes',
    }).as('editMemoryReq')

    cy.route({
      url: 'https://parseapi.back4app.com/classes/memory',
      method: 'POST',
      response: '@editedMemoryRes',
    }).as('editedMemoryReq')

    cy.findAllByText('Edit')
      .first()
      .click({ force: true })

    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', { name: 'Save' }).click()
    })

    cy.wait(['@editMemoryReq', '@editedMemoryReq'])

    cy.findByRole('dialog').should('not.exist')
    cy.findByRole('alert').within(() => {
      cy.findByText('Memory updated').should('be.visible')
    })
  })

  it('closes the cancel modal when the user clicks "Cancel"', () => {
    cy.findAllByText('Delete')
      .first()
      .click({ force: true })

    cy.findByText('Cancel').click()

    cy.findByRole('dialog').should('not.exist')
  })

  it('renders an error boundary when the server returns a malformed response', () => {
    // See: https://docs.cypress.io/api/events/catalog-of-events.html#Examples
    // this event will automatically be unbound when this
    // test ends because it's attached to 'cy'
    cy.on('uncaught:exception', () => {
      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()

      // return false to prevent the error from
      // failing this test
      return false
    })

    cy.fixture('memory.malformed.json').as('memoriesGetRes')
    cy.route({
      url: 'https://parseapi.back4app.com/classes/memory',
      method: 'POST',
      response: '@memoriesGetRes',
    }).as('memoriesGet')

    cy.visit('/memories')

    cy.wait('@memoriesGet')

    cy.findByText('Unfortunately, something went wrong with our app. Please try again.').should(
      'be.visible',
    )
    cy.findByText("Eva's Memories").should('be.visible') // Checks that the header still exists
  })
})
