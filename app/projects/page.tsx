import { allProjects } from 'contentlayer/generated'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const sortedProjects = allProjects.sort((a, b) => b.cardSortOrder - a.cardSortOrder)

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Things I'm currently working on, or believe are neat to share.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {sortedProjects.map((p) => (
              <Card
                key={p.slug}
                title={p.name}
                description={p.summary}
                imgSrc={p.cardImg}
                href={`/projects/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
