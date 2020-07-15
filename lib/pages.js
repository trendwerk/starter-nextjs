import { get } from './api'

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
