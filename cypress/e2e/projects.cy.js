describe('Projects Page', () => {
  it('passes', () => {
    cy.visit('/projects')

    cy.get('h1').should('have.text', 'Projects')
    cy.get('[data-cy="project-card"]').should('have.length.gte', 3)
    cy.get('[data-cy="project-card"]')
      .first()
      .within(() => {
        cy.get('h2').within(() => {
          cy.get('a').as('projectLink').click()
        })
      })

    cy.get('@projectLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('[data-cy="other-projects"]').within(() => {
      cy.get('li').should('have.length.gte', 2)
      cy.get('a').first().as('projectLink').click()
    })

    cy.get('@projectLink').then((link) => {
      cy.location('pathname').should('eq', link.attr('href'))
      cy.get('h1').should('have.text', link.text())
    })

    cy.get('a').contains('Initial Demo')
  })
})
