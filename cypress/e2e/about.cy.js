import siteMetadata from '../../data/siteMetadata'

describe('About Page', () => {
  it('should display the about page and some details', () => {
    cy.visit('/about')

    cy.get('h1').should('have.text', 'About')
    cy.get('[data-cy="author-image"]').should('have.length', 1)
    cy.get('h3').should('have.text', siteMetadata.author)
    cy.get('[data-cy="occupation"]').should('have.text', 'Software Engineer')
    cy.get(`a[href*="mailto:${siteMetadata.email}"]`).should('have.length', 2)
    cy.get(`a[href="${siteMetadata.github}"]`).should('have.length', 2)
    cy.get(`a[href="${siteMetadata.linkedin}"]`).should('have.length', 2)
  })
})
