import { formatSlug, getFiles } from '@/lib/mdx'

export function getProjectSlugs() {
  const projects = getFiles('projects')
  return projects.map((p) => {
    return {
      params: {
        slug: formatSlug(p)
      }
    }
  })
}
