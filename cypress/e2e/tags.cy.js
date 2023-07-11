describe('Tags', () => {
  it('navigates to the first tag and the first post within', () => {
    cy.visit('/tags')

    cy.get('h1').should('have.text', 'Tags')
    cy.get('a[href^="/tags/"]').first().as('tagLink').click()

    cy.get('@tagLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
    })

    cy.get('article')
      .first()
      .within(() => {
        cy.get('a[href^="/blog"]').as('articleLink').click()
      })

    cy.get('@articleLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })
  })
})
