import fs from 'fs'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import { generateProjectsRss } from '@/lib/generate-rss'
import { dateSortDesc, getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import { getProjectSlugs } from '@/lib/projects'

export async function getStaticPaths() {
  const slugs = getProjectSlugs()
  return {
    paths: slugs,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const projectData = await getFileBySlug('projects', params.slug)
  const allProjectsFrontmatter = await getAllFilesFrontMatter('projects')
  projectData.projects = allProjectsFrontmatter.map(({ name, slug }) => ({
    name: name,
    slug: slug
  }))

  // rss
  if (allProjectsFrontmatter.length > 0) {
    const sortedProjectsByLastMod = allProjectsFrontmatter.sort((a, b) =>
      dateSortDesc(a.lastMod, b.lastMod)
    )
    const rssContents = generateProjectsRss(sortedProjectsByLastMod, 'project_feed.xml')
    fs.writeFileSync('./public/projects.xml', rssContents)
  }

  return {
    props: {
      ...projectData
    }
  }
}

export default function Project(projectData) {
  const { mdxSource, frontMatter, projects } = projectData

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout="ProjectLayout"
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          projects={projects}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
