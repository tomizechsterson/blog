![tailwind-nextjs-banner](/public/static/images/twitter-card.png)

# Tailwind Nextjs Blog

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) blogging template. Probably the most feature-rich Next.js markdown blogging template out there. It comes out of the box configured with the latest technologies to make technical writing a breeze. Easily configurable and customizable. Perfect as a replacement to existing Jekyll and Hugo individual blogs.

This blog was started from the template found [here](https://github.com/timlrx/tailwind-nextjs-starter-blog#readme). For in-depth information on how to get started head on over there. Since this particular blog was started, some deviations have happened. They will be documented below.

## New Bits

### Projects Organization

Since I wanted this blog to be a place where I could showcase stuff I'm working on, I found a need to go a bit farther than the default `projectsData.js` method that comes with the starter kit. The default is great if you primarily link to external sites from the cards found at `/projects`, but I wanted to link internally, to pages composed for each project. Therefore, the top-level Projects page was updated to make use of the frontmatter of project pages, and the projects themselves are now their own dynamic route, similar to the blog posts.

- The top-level Projects page now uses the frontmatter of all project pages to generate the cards.
  - The display order can be customized by using the `cardSortOrder` value.
- The project pages themselves are written much like blog posts, and are found in the `/data/projects` folder.
- A new RSS feed is now being generated from the project data.

Here are the fields currently supported in project file frontmatter:

```
name (required, title for project card, and item.title field of RSS feed)
summary (required, sub-title for project card, and item.description field of RSS feed)
cardImg (required, hero image displayed on project card)
cardSortOrder (optional, drives display order on /projects. If omitted, order is determined by descending date)
date (required, output as item.pubDate for RSS feed, and drives card display order if cardSortOrder is omitted)
lastMod (required, used for ordering the RSS feed items, and for determining the channel.lastBuildDate)
initialDemo (optional, used to display a link to the demo of the project in its initial state)
currentDemo (optional, used to display a link to the demo of the project in its current state)
images: (optional, an array of image paths that will be displayed under the demo links)
```

Here's an example of a project's frontmatter:

```
---
name: Space Asteroids
summary: A Godot project walkthrough that gives you a good start to an Asteroids-like arcade shooter
cardImg: /static/images/project-cards/godot_logo_asteroids.png
cardSortOrder: 1
date: '2023-06-03T12:30:00Z'
lastMod: '2023-07-01T19:30:00Z'
initialDemo: '/static/games/asteroids-initial/space-asteroid.html'
currentDemo: '/static/games/asteroids-current/space-asteroid.html'
images:
  [
    '/static/images/screenshots/space-asteroids/gameplay.png',
    '/static/images/screenshots/space-asteroids/game-over.png'
  ]
---
```

Keep in mind that this blog is specifically designed to be working with Godot projects, so assumptions have been made around that. Shouldn't be too hard to customize for other purposes, though.

### New siteMetadata

`projectsPageDescription: used similarly to siteMetadata.description, except on the Projects page`

This is also used in the RSS feed as a more accurate description of the projects' channel.

## Notes

### Project Card Hero Images

These images should be 16 x 9.
