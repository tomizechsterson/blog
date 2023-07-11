describe('Blog', () => {
  it('should display list of posts and navigate around them', () => {
    cy.visit('/blog')

    cy.get('h1').contains('All Posts')
    cy.get('article').should('have.length', 5)
    cy.get('[aria-label="Search articles"]').type('retro platformer')
    cy.get('article').should('have.length', 1)

    cy.get('article').within(() => {
      cy.get('a[href^="/blog"]').then(($a) => {
        cy.get($a).invoke('text').as('anchorText')
        cy.get($a).invoke('attr', 'href').as('href')
        cy.get($a).click()
      })
    })

    cy.get('@anchorText').then((text) => {
      cy.get('h1').contains(text)
    })
    cy.get('@href').then((href) => {
      cy.location('pathname').should('eq', href)
    })
    cy.get('div').contains('min read')
    cy.get('h2').contains('Tags')
    cy.get('h2')
      .contains('Tags')
      .parent()
      .within(() => {
        cy.get('a').should('have.length', 3)
      })

    cy.get('h2')
      .contains('Previous Article')
      .parent()
      .within(() => {
        cy.get('a[href^="/blog"]').then(($a) => {
          cy.get($a).invoke('text').as('anchorText')
          cy.get($a).invoke('attr', 'href').as('href')
          cy.get($a).click()
        })
      })

    cy.get('@anchorText').then((text) => {
      cy.get('h1').contains(text)
    })
    cy.get('@href').then((href) => {
      cy.location('pathname').should('eq', href)
    })

    cy.get('h2')
      .contains('Next Article')
      .parent()
      .within(() => {
        cy.get('a[href^="/blog"]').then(($a) => {
          cy.get($a).invoke('text').as('anchorText')
          cy.get($a).invoke('attr', 'href').as('href')
          cy.get($a).click()
        })
      })

    cy.get('@anchorText').then((text) => {
      cy.get('h1').contains(text)
    })
    // Apparently, there's an upper limit to how many times you can do this before Cypress
    // becomes too stupid to do exactly what it successfully did just moments before. Go figure.
    // cy.get('@href').then(href => {
    //   cy.location('pathname').should('eq', href)
    // })

    cy.get('a').contains('Back to the blog').click()
    cy.get('h1').contains('All Posts')
  })
})
