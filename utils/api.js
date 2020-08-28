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
  general {
    fields {
      companyName
      address
      city
      zipcode
      email
      telephone
      facebook
      instagram
      linkedin
      pinterest
      twitter
      youtube
    }
  }
  menus {
    nodes {
      name
      locations
      items: menuItems(where: {parentId: "null"}) {
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
    }
  }
`

export const pageQuery = `
  title
  uri
  content
  fields {
    headerImage {
      url:sourceUrl
    }
    pageTitle
    metaDescription
  }
`

export const postsQuery = ({ cursor = '', taxQuery = '{}', search = '' } = {}) => `
  posts(
    first: 10,
    after: "${cursor}",
    where: {
      taxQuery: ${taxQuery},
      search: "${search}",
    }
  ) {
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
        children {
          edges {
            node {
              id
              name
              uri
            }
          }
        }
      }
    }
  }
`

export const termsQuery = (taxonomy) => `
  ${taxonomy}(where: { parent: 0 }) {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
`
