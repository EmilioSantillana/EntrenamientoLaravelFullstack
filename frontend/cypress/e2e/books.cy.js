describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    //List books
    cy.visit('/')
    .get('[data-cy=link-to-books]').click()
    //CreateBooks
    cy.get('[href="/libros/crear"]').click()
    .get('[data-cy=input-book-title]').type('New book from cypress')
    .get('[data-cy=button-submit-book]').click()
    .get('[data-cy=book-list]').contains('New book from cypress')
    //Show Book
    cy.get('[data-cy^=link-to-visit-book-]').last().click()
    .get('h1').should('contain.text', 'New book from cypress')
    .get('[href="/libros"]').click()
    //Edit Book
    cy.get('[data-cy^=link-to-edit-book-]').last().click()
    .get('[data-cy=input-book-title]').clear().type('Book edited by cypress')
    .get('[data-cy=button-submit-book]').click()
    .get('[data-cy=book-list]').contains('Book edited by cypress')
    //Delete book
    cy.get('[data-cy^=button-to-delete-book-]').last().click()
    .wait(1000)//Tuve que agregar un delay porque me tiraba error
    .get('[data-cy^=link-to-visit-book-]').last().should('not.include.text', 'Book edited by cypress')
  })
})