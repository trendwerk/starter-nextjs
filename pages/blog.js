import { fetchData, mainQuery, postsQuery, categoriesQuery } from 'utils/api'
import BlogArchive from 'components/BlogArchive'
import Content from 'components/Content'
import Head from 'components/Head'
import Header from 'components/Header'
import Layout from 'components/Layout'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function Blog(data) {
  const blog = data.blog

  return (
    <Layout data={data}>
      <Head
        title={blog.fields?.pageTitle || blog.fields?.title || 'Blog'}
        description={blog.fields?.metaDescription}
        image={blog.fields?.ogImage?.url || blog.fields?.headerImage?.url}
      />

      <Header image={blog.fields?.headerImage} title={blog.fields?.title} />

      <Wrap width="800">
        <Title>{blog.fields?.title || 'Blog'}</Title>

        <Content content={blog.fields?.content} />
      </Wrap>

      <BlogArchive
        title="Blog"
        posts={data.posts}
        categories={data.categories}
        fetchMore={(cursor) => {
          return fetchData(`
            query BlogMorePosts {
              ${postsQuery(cursor)}
            }
          `)
        }}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await fetchData(`
    query Blog {
      blog {
        fields {
          headerImage {
            url:sourceUrl
          }
          title
          content
          pageTitle
          metaDescription
        }
      }
      ${postsQuery()}
      ${categoriesQuery}
      ${mainQuery}
    }
  `)

  return { props: data }
}
