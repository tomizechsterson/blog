import { MDXLayoutRenderer } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import { getFileBySlug } from '@/lib/mdx'
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
  // Get list of project slugs to send to layout, so we can display links to other projects
  // Add this list to projectData similar to how testProp is
  projectData.testProp = 'BLAH'
  return {
    props: {
      ...projectData
    }
  }
}

export default function Project(projectData) {
  const { mdxSource, frontMatter } = projectData

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout="ProjectLayout"
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          testProp={'SOMETHING'}
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
