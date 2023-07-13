describe('Blog', () => {
  it('should display list of posts and navigate around them', () => {
    cy.visit('/blog')

    cy.get('h1').should('have.text', 'All Posts')
    cy.get('article').should('have.length.gte', 5)
    cy.get('[data-cy="list-search"]')
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
    cy.get('[data-cy="tag-list"]').within(() => {
      cy.get('a').should('have.length.gt', 0)
    })

    cy.get('h2').contains('Previous Article')
    cy.get('[data-cy="previous-article-link"]').as('articleLink').click()
    cy.get('@articleLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('h2').contains('Next Article')
    cy.get('[data-cy="next-article-link"]').as('articleLink').click()
    cy.get('@articleLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('a').contains('Back to the blog').click()
    cy.get('h1').should('have.text', 'All Posts')
  })
})
