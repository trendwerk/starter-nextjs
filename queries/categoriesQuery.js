import termQuery from 'queries/termQuery'

export default function categoriesQuery() {
  return `
    categories: blogCategories(where: { parent: 0 }) {
      edges {
        category: node {
          id
          name
          uri
          children {
            edges {
              node {
                ${termQuery()}
              }
            }
          }
        }
      }
    }
  `
}
