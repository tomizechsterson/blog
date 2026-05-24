# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Contentlayer2 (MDX) · Yarn 4 (`packageManager` field is authoritative — do not use `npm` or `pnpm`).

## Commands

- `yarn dev` — local dev server (Next.js).
- `yarn build` — `next build` followed by `scripts/postbuild.mjs` (RSS generation). Building also runs `contentlayer` via `next-contentlayer2`, regenerating `.contentlayer/generated/`, `app/tag-data.json`, and `public/search.json`.
- `yarn serve` — serve the production build.
- `yarn lint` — runs ESLint (`--fix`) on `pages app components lib layouts scripts` **and** `tsc --noEmit`. This is the only typecheck path; there is no standalone `typecheck` script.
- `yarn analyze` — `ANALYZE=true next build`, opens the bundle analyzer.

There are no automated tests in this repo.

## Content pipeline

All long-form content is MDX under `data/`, transformed at build time by Contentlayer into a typed module set under `.contentlayer/generated/` (gitignored). App code imports the generated arrays via `contentlayer/generated` (e.g. `allBlogs`, `allProjects`, `allAuthors`).

**Schema is centralized in `contentlayer.config.ts`.** Three document types:

- **`Blog`** — `data/blog/**/*.mdx`. Frontmatter: `title`, `date` (required), `tags`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `bibliography`, `canonicalUrl`. The `layout` field selects from `PostSimple | PostLayout | PostBanner | PostLayoutReduced` (default `PostLayout`); the mapping lives in `app/blog/[...slug]/page.tsx`.
- **`Project`** — `data/projects/**/*.mdx`. Frontmatter: `title`, `date`, `cardSortOrder` (required), `summary`, `cardImg`, `initialDemo`, `currentDemo`, `images`, `notes`.
- **`Authors`** — `data/authors/**/*.mdx`. `default.mdx` is the fallback when a blog post has no `authors` frontmatter.

Adding a frontmatter field requires editing the corresponding `defineDocumentType` in `contentlayer.config.ts`; just adding it to MDX files will be silently dropped.

Computed fields (`readingTime`, `slug`, `path`, `filePath`, `toc`, plus `structuredData` for Blog) are also defined there. `slug` strips the first path segment of `flattenedPath`, so `data/blog/foo/bar.mdx` has slug `foo/bar`.

The `onSuccess` hook in `contentlayer.config.ts` writes two derived files that **should not be hand-edited**:

- `app/tag-data.json` — tag → count map used by `/tags`.
- `public/search.json` — kbar search index (only written when `siteMetadata.search.provider === 'kbar'`).

## Projects: the main deviation from the upstream template

This repo started from the Pliny/Tailwind Next.js starter, but **the Projects section is rebuilt**. Upstream uses a static `projectsData.js` array of external links; here, each project is a first-class MDX document with its own dynamic route at `/projects/[...slug]` and its own RSS feed. `/projects` (`app/projects/page.tsx`) generates cards by sorting `allProjects` by `cardSortOrder` descending. Card hero images (`cardImg`) should be 16:9.

When the user asks to "add a project," create `data/projects/<slug>.mdx` with the frontmatter above — do not modify or recreate a `projectsData.js`.

## Routing

App Router under `app/`:

- `app/blog/[...slug]/page.tsx` — blog posts. Catch-all because slugs may contain `/`.
- `app/blog/page/[page]/` — paginated blog index.
- `app/projects/[...slug]/page.tsx` — project pages.
- `app/tags/[tag]/page/` — paginated tag listings.

All dynamic pages use `generateStaticParams` and are statically rendered at build.

## Path aliases (tsconfig.json)

`@/components/*`, `@/data/*`, `@/layouts/*`, `@/css/*`. Contentlayer output is reached via the bare specifier `contentlayer/generated` (mapped to `./.contentlayer/generated`). Prefer these over relative `../../..` paths.

`strict: false` but `strictNullChecks: true` — null/undefined are checked, broader strict-mode rules are not.

## Site configuration

`data/siteMetadata.js` is the single source of site-wide config (title, URLs, social links, analytics, comments, search, newsletter). The upstream `description` field has a sibling `projectsPageDescription` used on `/projects` — a local extension noted in `README.md`.

## Generated / ignored

`.contentlayer/`, `app/tag-data.json`, `public/search.json`, `public/feed.xml`, `public/sitemap.xml` are all generated. Edit the source (MDX, `siteMetadata.js`, `contentlayer.config.ts`, `scripts/rss.mjs`, `app/sitemap.ts`) rather than the output.
