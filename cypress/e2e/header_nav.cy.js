const sizes = [
  'iphone-se2',
  'iphone-xr',
  'iphone-x',
  'iphone-8',
  'iphone-7',
  'iphone-6+',
  'iphone-6',
  'ipad-2',
  'ipad-mini',
  'macbook-11',
  'macbook-13',
  'macbook-15',
  'macbook-16',
  'samsung-note9',
  'samsung-s10',
  [1280, 720],
  [1920, 1080]
]

describe('Header Nav', () => {
  sizes.forEach((size) => {
    it(`should click on each header nav item on ${size} screen`, () => {
      if (Array.isArray(size)) cy.viewport(size[0], size[1])
      else cy.viewport(size)

      // cy.log('size: ', size)
      cy.window().then((win) => cy.log(win.innerWidth + ' x ' + win.innerHeight))

      cy.visit('/')
      // TODO: FIGURE OUT HOW TO DETECT VISIBILITY/SCREEN SIZE AND CLICK HAMBURGER MENU ACCORDINGLY
      // WIDTH <640 IS WHEN HAMBURGER MENU APPEARS
      // TODO: Also consider combining all tests into one 'smoke test' (will make above easier),
      // or do we want to only consider different screen sizes when the hamburger menu is needed..?
      // cy.get('a').contains('Blog').click()
      // cy.location('pathname').should('eq', '/blog')
      // cy.get('a').contains('Tags').click()
      // cy.location('pathname').should('eq', '/tags')
      // cy.get('a').contains('Projects').click()
      // cy.location('pathname').should('eq', '/projects')
      // cy.get('a').contains('About').click()
      // cy.location('pathname').should('eq', '/about')
    })
  })

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
