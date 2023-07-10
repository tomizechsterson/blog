describe('Blog', () => {
  it('should display list of posts and navigate around them', () => {
    cy.visit('/blog')

    cy.get('h1').contains('All Posts')
  })
})
