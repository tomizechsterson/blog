describe('Blog', () => {
  it('should display list of posts and navigate around them', () => {
    cy.visit('/blog')

    cy.get('h1').contains('All Posts')
    cy.get('article').should('have.length', 5)

    cy.get('[aria-label="Search articles"]').type('retro platformer')
    cy.get('article').should('have.length', 1)

    cy.get('article')
      .first()
      .within(() => {
        cy.get('a[href^="/blog"]').then(($anchor) => {
          const text = $anchor.text()
          const pathname = $anchor[0].pathname

          cy.get($anchor).click()
          cy.url().should('contain', pathname)
          cy.get('h1').contains(text)
          cy.get('div').contains('min read')
          cy.get('h2').contains('Tags')
        })
      })

    cy.get('h2')
      .contains('Previous Article')
      .parent()
      .within(() => {
        cy.get('a[href^="/blog"]').then(($a) => {
          const text = $a.text()
          const pathname = $a[0].pathname

          cy.get($a).click()
          cy.url().should('contain', pathname)
          cy.contains(text)
        })
      })

    cy.get('h2')
      .contains('Next Article')
      .parent()
      .within(() => {
        cy.get('a[href^="/blog"]').then(($a) => {
          const text = $a.text()
          const pathname = $a[0].pathname

          cy.get($a).click()
          cy.url().should('contain', pathname)
          cy.contains(text)
        })
      })

    cy.get('a').contains('Back to the blog').click()
    cy.get('h1').contains('All Posts')
  })
})
