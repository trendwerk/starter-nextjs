import {
  fetchData,
  mainQuery,
  buildPostsQuery,
  categoriesQuery,
} from 'utils/api'
import Head from 'components/Head'
import Layout from 'components/Layout'
import BlogArchive from 'components/BlogArchive'

const Blog = (data) => (
  <Layout data={data}>
    <Head title="Blog" description="" />
    <BlogArchive
      title="Blog"
      posts={data.posts}
      categories={data.categories}
      fetchMore={(cursor) => {
        return fetchData(`
          query BlogMorePosts {
            ${buildPostsQuery(cursor)}
          }
        `)
      }}
    />
  </Layout>
)

export default Blog

export async function getStaticProps() {
  const data = await fetchData(`
    query Blog {
      ${categoriesQuery}
      ${buildPostsQuery()}
      ${mainQuery}
    }
  `)

  return { props: data }
}
