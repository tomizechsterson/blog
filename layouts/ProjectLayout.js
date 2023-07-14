import Image from '@/components/Image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'

export default function ProjectLayout({ children, frontMatter, projects }) {
  const { name, initialDemo, currentDemo, images, notes } = frontMatter

  return (
    <>
      <PageSEO title={`Projects - ${name}`} description={`Projects - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {name}
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <div className="flex space-x-7 pt-6">
              {initialDemo && (
                <Link
                  href={initialDemo}
                  aria-label={`Link to ${name} initial demo`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Initial Demo
                </Link>
              )}
              {currentDemo && (
                <Link
                  href={currentDemo}
                  aria-label={`Link to ${name} current demo`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Current Demo
                </Link>
              )}
            </div>
            {images &&
              images.map((img) => {
                return <Image src={img} key={img} alt="screenshot" width="356" height="200" />
              })}
            <ul className="list-disc pb-5">
              Notes:
              {notes &&
                notes.map((note) => {
                  return <li key={note}>{note}</li>
                })}
            </ul>
            <div data-cy="other-projects">
              Other Projects:
              <ul>
                {projects.map((project) => {
                  if (project.slug === frontMatter.slug) return
                  const { name, slug } = project
                  return (
                    <li key={slug} className="py-1">
                      <Link
                        href={`/projects/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
