describe('About Page', () => {
  it('should display the about page and some details', () => {
    cy.visit('/about')

    cy.get('h1').should('have.text', 'About')
    cy.get('h3').should('have.text', 'Tomas Eychaner')
    cy.get('a[href*="mailto:"]').should('have.length', 2)
    cy.get('a[href="https://github.com/tomizechsterson"]').should('have.length', 2)
    cy.get('a[href="https://www.linkedin.com"]').should('have.length', 2)
  })
})
