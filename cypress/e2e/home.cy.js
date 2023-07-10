describe('Home Page', () => {
  it('should navigate to the home page', () => {
    cy.visit('/')

    cy.get('h1').contains('Latest Things')

    cy.get('a').contains('Blog')
    cy.get('a').contains('Tags')
    cy.get('a').contains('Projects')
    cy.get('a').contains('About')

    cy.get('a[href*="mailto:"]').should('have.length', 1)
    cy.get('a[href="https://github.com/tomizechsterson"]').should('have.length', 1)
    cy.get('a[href="https://www.linkedin.com"]').should('have.length', 1)
    cy.get('a[href="https://app.pluralsight.com/profile/tomaseychaner"]').should('have.length', 1)
    cy.get('a[href="https://rumble.com/user/tomizechsterson"]').should('have.length', 1)
    cy.get('a').contains("Tomas's Site").should('have.length', 1)
  })
})
