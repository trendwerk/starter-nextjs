export async function fetchData(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(`${process.env.WP_URL}/wp/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export const mainQuery = `
  app: generalSettings {
    dateFormat
    description
    language
    title
  }
  menuItems(first: 10000) {
    nodes {
      id
      label
      href: path
      locations
      parentId
      childItems {
        nodes {
          id
          label
          href: path
          childItems {
            nodes {
              id
              label
              path
            }
          }
        }
      }
    }
  }
`

export const buildPostsQuery = (cursor = '') => `
  posts(first: 1, after: "${cursor}") {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        title
        uri
        dateFormatted
        summary
        fields {
          summaryTitle
          summary
          summaryImage {
            url:sourceUrl
          }
          headerImage {
            url:sourceUrl
          }
        }
      }
    }
  }
`

export const categoriesQuery = `
  categories: blogCategories(where: { parent: 0 }) {
    edges {
      category: node {
        id
        name
        uri
      }
    }
  }
`
