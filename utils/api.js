export async function fetchData(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(process.env.WP_GRAPHQL_URL, {
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
  general {
    fields {
      address
      city
      companyName
      email
      facebook
      instagram
      linkedin
      telephone
      twitter
      youtube
      zipcode
    }
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
