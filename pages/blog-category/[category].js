import { useRouter } from 'next/router'
import Categories from 'components/Categories'
import categoriesQuery from 'queries/categoriesQuery'
import Content from 'components/Content'
import generalQuery from 'queries/generalQuery'
import getFromApi from 'functions/getFromApi'
import Head from 'components/Head'
import Layout from 'components/Layout'
import Loading from 'components/Loading'
import NotFound from 'components/NotFound'
import Posts from 'components/Posts'
import postsQuery from 'queries/postsQuery'
import Title from 'components/Title'
import Wrap from 'components/Wrap'

export default function BlogCategory(data) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <Loading fullScreen />
  }

  if (!data.category) {
    return <NotFound data={data} />
  }

  const category = data.category

  return (
    <Layout data={data}>
      <Head title={category.name} description={category.description} />

      <Wrap
        sidebar={
          <Categories
            categories={data.categories}
            currentCategory={category.id}
          />
        }
      >
        <Title>{category.name}</Title>

        {category.description && (
          <Content content={`<p>${category.description}</p>`} />
        )}

        <Posts
          posts={category.posts}
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

  return { props: data, revalidate: 60 }
}

export async function getStaticPaths() {
  const data = await getFromApi(`
    query ProductCategoryPaths { terms: productCategories(first: 1000) { nodes { slug } } }
  `)

  return {
    paths: data.blogCategories.nodes.map(({ slug }) => ({
      params: { category: slug },
    })),
    fallback: true,
  }
}
