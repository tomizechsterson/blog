import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import { ProjectsSEO } from '@/components/SEO'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export async function getStaticProps() {
  const projectFrontMatters = await getAllFilesFrontMatter('projects')
  const sortedFrontMatters = projectFrontMatters.sort((a, b) => a.cardSortOrder - b.cardSortOrder)

  return { props: { sortedFrontMatters } }
}

export default function Projects({ sortedFrontMatters }) {
  return (
    <>
      <ProjectsSEO
        title={`Projects - ${siteMetadata.author}`}
        description={`projects - ${siteMetadata.author}`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Things I'm currently working on, or believe are neat to share.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {sortedFrontMatters.map((f) => (
              <Card
                key={f.slug}
                title={f.name}
                description={f.summary}
                imgSrc={f.cardImg}
                href={`/projects/${f.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
