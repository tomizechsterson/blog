import siteMetadata from '../../data/siteMetadata'

const sizes = ['iphone-se2', 'ipad-2', [1920, 1080]]

const setViewPort = (size) => {
  if (Array.isArray(size)) cy.viewport(size[0], size[1])
  else cy.viewport(size)
}

describe('Smoke Test for Site', () => {
  sizes.forEach((size) => {
    it(`has header, top nav, and footer on the home page (${size})`, () => {
      setViewPort(size)

      cy.visit('/')

      cy.get('title').should('have.text', siteMetadata.title)
      cy.get('h1').should('have.text', 'Latest Things')

      cy.get('header').within(() => {
        cy.get('a').should('contain.text', 'Blog')
        cy.get('a').should('contain.text', 'Tags')
        cy.get('a').should('contain.text', 'Projects')
        cy.get('a').should('contain.text', 'About')
      })

      cy.get('footer').within(() => {
        cy.get(`a[href*="mailto:${siteMetadata.email}"]`).should('have.length', 1)
        cy.get(`a[href="${siteMetadata.github}"]`).should('have.length', 1)
        cy.get(`a[href="${siteMetadata.linkedin}"]`).should('have.length', 1)
        cy.get(`a[href="${siteMetadata.pluralsight}"]`).should('have.length', 1)
        cy.get(`a[href="${siteMetadata.rumble}"]`).should('have.length', 1)
        cy.get('div').should('contain.text', siteMetadata.author)
        cy.get('div').should('contain.text', `© ${new Date().getFullYear()}`)
        cy.get('a').contains(siteMetadata.title).should('have.length', 1)
      })
    })

    it(`navigates to first item on home page and back via header (${size})`, () => {
      setViewPort(size)

      cy.visit('/')

      cy.get('article').should('have.length', 5)
      cy.get('article')
        .first()
        .within(() => {
          cy.get('a').first().as('link').click()
        })

      cy.get('@link').then((link) => {
        cy.location('pathname').should('eq', link.attr('href'))
        cy.get('h1').should('have.text', link.text())
      })

      cy.get('[data-cy="header-link"]').click()
      cy.location('pathname').should('eq', '/')
    })

    it(`displays the about page and some details (${size})`, () => {
      setViewPort(size)

      cy.visit('/about')

      cy.get('h1').should('have.text', 'About')
      cy.get('[data-cy="author-image"]').should('have.length', 1)
      cy.get('h3').should('have.text', siteMetadata.author)
      cy.get('[data-cy="occupation"]').should('have.text', 'Software Engineer')
      cy.get(`a[href*="mailto:${siteMetadata.email}"]`).should('have.length', 2)
      cy.get(`a[href="${siteMetadata.github}"]`).should('have.length', 2)
      cy.get(`a[href="${siteMetadata.linkedin}"]`).should('have.length', 2)
    })

    it(`displays list of blog posts and navigates around them (${size})`, () => {
      setViewPort(size)

      cy.visit('/blog')

      cy.get('h1').should('have.text', 'All Posts')
      cy.get('article').should('have.length.at.least', 5)
      cy.get('[data-cy="list-search"]').type('retro platformer')
      cy.get('article').should('have.length', 1)

      cy.get('article').within(() => {
        cy.get('a[href^="/blog"]').first().as('articleLink').click()
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
      cy.get('[data-cy="previous-article-link"]').then(($prevArticleLink) => {
        cy.get('a').contains($prevArticleLink.text()).click()
        cy.location('pathname').should('eq', $prevArticleLink.attr('href'))
        cy.get('h1').should('have.text', $prevArticleLink.text())
      })

      cy.get('h2').contains('Next Article')
      cy.get('[data-cy="next-article-link"]').then(($nextArticleLink) => {
        cy.get('a').contains($nextArticleLink.text()).click()
        cy.location('pathname').should('eq', $nextArticleLink.attr('href'))
        cy.get('h1').should('have.text', $nextArticleLink.text())
      })

      cy.get('a').contains('Back to the blog').click()
      cy.get('h1').should('have.text', 'All Posts')
    })

    it(`displays the projects page and navigates around projects (${size})`, () => {
      setViewPort(size)

      cy.visit('/projects')

      cy.get('h1').should('have.text', 'Projects')
      cy.get('[data-cy="project-card"]').should('have.length.at.least', 3)
      cy.get('[data-cy="project-card"]')
        .first()
        .within(() => {
          cy.get('h2').within(() => {
            cy.get('a').then((projectLink) => {
              cy.get('a').click()
              cy.location('pathname').should('eq', projectLink.attr('href'))
            })
          })
        })

      cy.get('[data-cy="other-projects"]').within(() => {
        cy.get('li').should('have.length.at.least', 2)
        cy.get('a')
          .first()
          .then((projectLink) => {
            cy.get('a').first().click()
            cy.location('pathname').should('eq', projectLink.attr('href'))
          })
      })

      cy.get('a').contains('Initial Demo')
      cy.get('ul')
        .contains('Notes:')
        .within(() => {
          cy.get('li').should('have.length.at.least', 1)
        })
    })

    it(`navigates to the first tag and the first post within (${size})`, () => {
      setViewPort(size)

      cy.visit('/tags')

      cy.get('h1').should('have.text', 'Tags')
      cy.get('a[href^="/tags/"]').first().as('tagLink').click()

      cy.get('@tagLink').then((link) => {
        cy.location('pathname').should('eq', link.attr('href'))
        cy.get('h1').contains(link.text(), { matchCase: false })
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

    it(`clicks on each header nav item (${size})`, () => {
      setViewPort(size)

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
