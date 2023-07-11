describe('Tags', () => {
  it('navigates to the first tag', () => {
    cy.visit('/tags')

    cy.get('h1').contains('Tags')
    cy.get('a[href^="/tags/"]')
      .first()
      .then((a) => {
        cy.get(a).invoke('attr', 'href').as('href')
        cy.get(a).click()
      })

    cy.get('@href').then((href) => {
      cy.location('pathname').should('eq', href)
    })

    cy.get('article')
      .first()
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
  })
})
