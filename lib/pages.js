import { get } from 'lib/api'

export async function getPages() {
  const data = await get(`
    {
      pages(first: 10) {
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
  return data?.pages
}
