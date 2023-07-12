describe('Blog', () => {
  it('should display list of posts and navigate around them', () => {
    cy.visit('/blog')

    cy.get('h1').should('have.text', 'All Posts')
    cy.get('article').should('have.length', 5)
    cy.get('[aria-label="Search articles"]')
      .type('retro platformer')
      .should('have.value', 'retro platformer')
    cy.get('article').should('have.length', 1)

    cy.get('article').within(() => {
      cy.get('a[href^="/blog"]').as('articleLink').click()
    })

    cy.get('@articleLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })
    cy.get('div').should('contain.text', 'min read')
    cy.get('h2').should('contain.text', 'Tags')
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
        cy.get('a[href^="/blog"]').as('articleLink2').click()
      })

    cy.get('@articleLink2').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('h2')
      .contains('Next Article')
      .parent()
      .within(() => {
        cy.get('a[href^="/blog"]').as('articleLink3').click()
      })

    cy.get('@articleLink3').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('a').contains('Back to the blog').click()
    cy.get('h1').should('have.text', 'All Posts')
  })
})
