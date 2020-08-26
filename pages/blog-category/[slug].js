import {
  fetchData,
  mainQuery,
  postsQuery,
  categoriesQuery,
} from 'utils/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import BlogArchive from 'components/BlogArchive'

const BlogCategory = (data) => (
  <Layout data={data}>
    <Head title={data.category.name} description={data.category.description} />
    <BlogArchive
      title={data.category.name}
      description={data.category.description}
      posts={data.category.posts}
      categories={data.categories}
      currentCategory={data.category.id}
      fetchMore={async (cursor) => {
        const result = await fetchData(
          `
          query CategoryMorePosts($id: ID!) {
            category: blogCategory(id: $id, idType: SLUG) {
              ${postsQuery(cursor)}
            }
          }
        `,
          { variables: { id: data.category.slug } }
        )

        return result.category
      }}
    />
  </Layout>
)

export default BlogCategory

export async function getStaticProps({ params }) {
  const data = await fetchData(
    `
    query BlogCategory($id: ID!) {
      category: blogCategory(id: $id, idType: SLUG) {
        id
        name
        description
        slug
        ${postsQuery()}
      }
      ${categoriesQuery}
      ${mainQuery}
    },
  `,
    { variables: { id: params.slug } }
  )

  return { props: data }
}

export async function getStaticPaths() {
  const data = await fetchData(`
    query BlogCategoriesPaths {
      blogCategories {
        nodes {
          slug
        }
      }
    }
  `)

  return {
    paths: data.blogCategories.nodes.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
