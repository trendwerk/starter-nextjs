import { get } from 'lib/api'

export async function getPosts() {
  const data = await get(`
    {
      posts(first: 10) {
        edges {
          node {
            slug
            title
            id
          }
        }
      }
    }
  `)
  return data?.posts
}
