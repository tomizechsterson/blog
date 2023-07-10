describe('Header Nav', () => {
  it('should click on each header nav item', () => {
    cy.visit('/')

    cy.get('a[href="/blog"]').first().click()
    cy.url().should('contain', '/blog')
    cy.get('a[href="/tags"]').first().click()
    cy.url().should('contain', '/tags')
    cy.get('a[href="/projects"]').first().click()
    cy.url().should('contain', '/projects')
    cy.get('a[href="/about"]').first().click()
    cy.url().should('contain', '/about')
  })
})
