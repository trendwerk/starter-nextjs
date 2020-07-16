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

export async function getAllPosts() {
  const data = await get(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getPost(slug) {
  const data = await get(`
    query GET_POST($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
      }
    }
  `,
    {
      variables: {
        id: slug,
      },
    }
  )
  return data
}
