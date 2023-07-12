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
      cy.get('a[href*="mailto:"]').should('have.length', 1)
      cy.get('a[href="https://github.com/tomizechsterson"]').should('have.length', 1)
      cy.get('a[href="https://www.linkedin.com"]').should('have.length', 1)
      cy.get('a[href="https://app.pluralsight.com/profile/tomaseychaner"]').should('have.length', 1)
      cy.get('a[href="https://rumble.com/user/tomizechsterson"]').should('have.length', 1)
      cy.get('a').contains("Tomas's Site").should('have.length', 1)
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

    cy.get('a[aria-label="A Site That Has Things"]').click()

    cy.location('pathname').should('eq', '/')
  })
})
