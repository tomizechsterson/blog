import siteMetadata from '../../data/siteMetadata'

describe('Home Page', () => {
  it('should have header, top nav, and footer', () => {
    cy.visit('/')

    cy.get('title').should('have.text', siteMetadata.title)
    cy.get('h1').should('have.text', 'Latest Things')

    cy.get('header').within(() => {
      cy.get('a').should('contain.text', 'Blog')
      cy.get('a').should('contain.text', 'Tags')
      cy.get('a').should('contain.text', 'Projects')
      cy.get('a').should('contain.text', 'About')
    })

    cy.get('footer').within(() => {
      cy.get(`a[href*="mailto:${siteMetadata.email}"]`).should('have.length', 1)
      cy.get(`a[href="${siteMetadata.github}"]`).should('have.length', 1)
      cy.get(`a[href="${siteMetadata.linkedin}"]`).should('have.length', 1)
      cy.get(`a[href="${siteMetadata.pluralsight}"]`).should('have.length', 1)
      cy.get(`a[href="${siteMetadata.rumble}"]`).should('have.length', 1)
      cy.get('div').should('contain.text', siteMetadata.author)
      cy.get('div').should('contain.text', `© ${new Date().getFullYear()}`)
      cy.get('a').contains(siteMetadata.title).should('have.length', 1)
    })
  })

  it('should navigate to first item and back via header', () => {
    cy.visit('/')

    cy.get('article').should('have.length', 5)
    cy.get('article')
      .first()
      .within(() => {
        cy.get('a').first().as('link').click()
      })

    cy.get('@link').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('[data-cy="header-link"]').click()
    cy.location('pathname').should('eq', '/')
  })
})
