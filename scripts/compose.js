const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const getAuthors = () => {
  const authorPath = path.join(root, 'data', 'authors')
  return fs.readdirSync(authorPath).map((filename) => path.parse(filename).name)
}

const getLayouts = () => {
  const layoutPath = path.join(root, 'layouts')
  return fs
    .readdirSync(layoutPath)
    .map((filename) => path.parse(filename).name)
    .filter((file) => file.toLowerCase().includes('post'))
}

const genFrontMatter = (answers) => {
  const d = new Date()
  const date =
    [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join(
      '-'
    ) +
    'T' +
    [
      ('0' + d.getHours()).slice(-2),
      ('0' + d.getMinutes()).slice(-2),
      ('0' + d.getSeconds()).slice(-2)
    ].join(':') +
    'Z'
  const tagArray = answers.tags.split(',')
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()))
  const tags = "'" + tagArray.join("','") + "'"
  const authorArray = answers.authors.length > 0 ? "'" + answers.authors.join("','") + "'" : ''

  let frontMatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: '${date}'
  tags: [${answers.tags ? tags : ''}]
  summary: ${answers.summary ? answers.summary : ' '}
  layout: ${answers.layout}
  canonicalUrl: ${answers.canonicalUrl}
  `

  if (answers.draft === 'yes') frontMatter = frontMatter + '\ndraft: true'

  if (answers.authors.length > 0) frontMatter = frontMatter + `\nauthors: [${authorArray}]`

  frontMatter = frontMatter + '\n---\n'

  return frontMatter
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input'
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input'
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input'
    },
    {
      name: 'layout',
      message: 'Select layout',
      type: 'list',
      default: 'PostLayoutReduced',
      choices: getLayouts
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['md', 'mdx']
    },
    {
      name: 'authors',
      message: 'Choose authors:',
      type: 'checkbox',
      choices: getAuthors
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['yes', 'no']
    },
    {
      name: 'canonicalUrl',
      message: 'Enter canonical url:',
      type: 'input'
    }
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = genFrontMatter(answers)

    if (!fs.existsSync('data/blog')) fs.mkdirSync('data/blog', { recursive: true })

    const filePath = `data/blog/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`

    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${filePath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!')
    }
  })
