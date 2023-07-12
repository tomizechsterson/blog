describe('Header Nav', () => {
  it('should click on each header nav item', () => {
    cy.visit('/')

    cy.get('a').contains('Blog').click()
    cy.location('pathname').should('eq', '/blog')
    cy.get('a').contains('Tags').click()
    cy.location('pathname').should('eq', '/tags')
    cy.get('a').contains('Projects').click()
    cy.location('pathname').should('eq', '/projects')
    cy.get('a').contains('About').click()
    cy.location('pathname').should('eq', '/about')
  })
})
