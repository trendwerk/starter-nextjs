export default async function getFromApi(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const response = await fetch(`${process.env.WP_URL}/wp/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].debugMessage || json.errors[0].message)
  }

  return json.data
}
