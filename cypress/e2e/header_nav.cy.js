describe('Header Nav', () => {
  it('should click on each header nav item', () => {
    cy.visit('/')

    cy.get('a[href="/blog"]').first().click()
    cy.location('pathname').should('eq', '/blog')
    cy.get('a[href="/tags"]').first().click()
    cy.location('pathname').should('eq', '/tags')
    cy.get('a[href="/projects"]').first().click()
    cy.location('pathname').should('eq', '/projects')
    cy.get('a[href="/about"]').first().click()
    cy.location('pathname').should('eq', '/about')
  })
})
