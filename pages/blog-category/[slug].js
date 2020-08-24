import { fetchData, mainQuery } from 'utils/api'
import Head from 'components/Head'
import Layout from 'components/Layout'

export default function Category(data) {
  const category = data.category

  return (
    <Layout data={data}>
      <Head title={category.name} description="" />

      <h1>{category.name}</h1>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await fetchData(
    `
    query BlogCategory {
      category: blogCategory(id: "${params.slug}", idType: SLUG) {
        name
      }
      ${mainQuery}
    }
  `)

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
