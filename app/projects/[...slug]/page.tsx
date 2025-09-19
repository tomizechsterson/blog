import { Project, allProjects } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import ProjectLayout from '@/layouts/ProjectLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  return allProjects.map((p) => ({ slug: p.slug.split('/').map((title) => decodeURI(title)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const project = allProjects.find((p) => p.slug === slug) as Project
  const mainContent = coreContent(project)

  return (
    <>
      {project ? (
        <ProjectLayout frontMatter={mainContent} allProjects={allProjects}>
          <MDXLayoutRenderer code={project.body.code} />
        </ProjectLayout>
      ) : (
        notFound()
      )}
    </>
  )
}
