import ViewportPreset = Cypress.ViewportPreset

const sizes: (ViewportPreset | number[])[] = [
  'iphone-se2', // 750x1334
  'iphone-xr', // 828x1792
  'iphone-x', // 1125x2436
  'ipad-mini', // 2048x1536
  'macbook-15', // 2880x1864
  'macbook-16', // 3072x1920
  'samsung-note9', // 1440x2960
  'samsung-s10', // 1440x3040
  [1280, 720],
  [1920, 1080],
]

describe('Header Nav', () => {
  sizes.forEach((size) => {
    it(`should click on each header nav item on ${size} screen`, () => {
      if (Array.isArray(size)) cy.viewport(size[0], size[1])
      else cy.viewport(size)

      // cy.log('size: ', size)
      cy.window().then((win) => {
        cy.visit('/')

        if (win.innerWidth < 640) {
          cy.get('[data-cy="hamburger-menu"]').click()
          cy.get('[data-cy="mobile-nav"]').within(() => {
            cy.get('a').contains('Blog').click()
          })
          cy.location('pathname').should('eq', '/blog')
          cy.get('[data-cy="hamburger-menu"]').click()
          cy.get('[data-cy="mobile-nav"]').within(() => {
            cy.get('a').contains('Tags').click()
          })
          cy.location('pathname').should('eq', '/tags')
          cy.get('[data-cy="hamburger-menu"]').click()
          cy.get('[data-cy="mobile-nav"]').within(() => {
            cy.get('a').contains('Projects').click()
          })
          cy.location('pathname').should('eq', '/projects')
          cy.get('[data-cy="hamburger-menu"]').click()
          cy.get('[data-cy="mobile-nav"]').within(() => {
            cy.get('a').contains('About').click()
          })
          cy.location('pathname').should('eq', '/about')
        } else {
          cy.get('a').contains('Blog').click()
          cy.location('pathname').should('eq', '/blog')
          cy.get('a').contains('Tags').click()
          cy.location('pathname').should('eq', '/tags')
          cy.get('a').contains('Projects').click()
          cy.location('pathname').should('eq', '/projects')
          cy.get('a').contains('About').click()
          cy.location('pathname').should('eq', '/about')
        }
      })
    })
  })
})
