import Categories from 'components/Categories'
import categoriesQuery from 'queries/categoriesQuery'
import Content from 'components/Content'
import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Posts from 'components/Posts'
import postsQuery from 'queries/postsQuery'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function BlogCategory({ data }) {
  return (
    <Layout data={data}>
      <Head
        title={data.category.name}
        description={data.category.description}
      />

      <Wrap
        sidebar={
          <Categories
            categories={data.categories}
            currentCategory={data.category.id}
          />
        }
      >
        <Title>{data.category.name}</Title>

        {data.category.description && (
          <Content content={`<p>${data.category.description}</p>`} />
        )}

        <Posts
          posts={data.category.posts}
          fetchMore={async (cursor) => {
            const result = await getFromApi(
              `
              query CategoryMorePosts($id: ID!) {
                category: blogCategory(id: $id, idType: SLUG) {
                  ${postsQuery({ cursor })}
                }
              }
            `,
              { variables: { id: data.category.slug } }
            )

            return result.category
          }}
        />
      </Wrap>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getFromApi(
    `
    query BlogCategory($id: ID!) {
      category: blogCategory(id: $id, idType: SLUG) {
        id
        name
        description
        slug
        ${postsQuery()}
      }
      ${categoriesQuery()}
      ${generalQuery()}
    },
  `,
    { variables: { id: params.category } }
  )

  if (!data.category) {
    return { notFound: true }
  }

  return { props: { data }, revalidate: 60 }
}

export async function getStaticPaths() {
  const data = await getFromApi(`
    query BlogCategoriesPaths {
      blogCategories {
        nodes {
          slug
        }
      }
    }
  `)

  return {
    paths: data.blogCategories.nodes.map(({ slug }) => ({
      params: { category: slug },
    })),
    fallback: 'blocking',
  }
}
