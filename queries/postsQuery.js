import postQuery from 'queries/postQuery'

export default function postsQuery({
  cursor = '',
  taxQuery = '{}',
  search = '',
} = {}) {
  return `
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
          ${postQuery()}
        }
      }
    }
  `
}
