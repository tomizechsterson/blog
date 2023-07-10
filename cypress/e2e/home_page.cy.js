describe('Home Page', () => {
  it('should navigate to the home page', () => {
    cy.visit('/')

    cy.get('h1').contains('Latest Things')
    cy.get('a').contains('Blog')
    cy.get('a').contains('Tags')
    cy.get('a').contains('Projects')
    cy.get('a').contains('About')
  })
})
