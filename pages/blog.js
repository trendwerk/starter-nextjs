import {
  fetchData,
  mainQuery,
  postsQuery,
  categoriesQuery,
  termsQuery,
} from 'utils/api'
import { useState, useEffect } from 'react'
import Posts from 'components/Posts'
import Categories from 'components/Categories'
import Content from 'components/Content'
import Head from 'components/Head'
import Header from 'components/Header'
import Layout from 'components/Layout'
import TermFilter from 'components/TermFilter'
import Title from 'components/Title'
import SearchFilter from 'components/SearchFilter'
import Wrap from 'components/Wrap'

const getTaxQuery = (taxFilter) => {
  let taxArray = ''

  for (const [tax, terms] of Object.entries(taxFilter)) {
    if (terms.length > 0) {
      taxArray += `
        {
          terms: [${terms.map((term) => `"${term}"`).join(',')}],
          taxonomy: ${tax},
          field: SLUG,
        }
      `
    }
  }

  return `{
    relation: AND,
    taxArray: [${taxArray}],
  }`
}

export default function Blog(data) {
  const blog = data.blog
  const [taxFilter, setTaxFilter] = useState({})
  const [search, setSearch] = useState()
  const [posts, setPosts] = useState(data.posts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const result = await fetchData(`
        query FilterPosts {
          ${postsQuery({ taxQuery: getTaxQuery(taxFilter), search })}
        }
      `)

      setLoading(false)
      setPosts(result.posts)
    }

    if (Object.entries(taxFilter).length > 0 || search != undefined) {
      getPosts()
    }
  }, [taxFilter, search])

  return (
    <Layout data={data}>
      <Head
        title={blog.fields?.pageTitle || blog.fields?.title || 'Blog'}
        description={blog.fields?.metaDescription}
        image={blog.fields?.ogImage?.url || blog.fields?.headerImage?.url}
      />

      <Header image={blog.fields?.headerImage} title={blog.fields?.title} />

      <Wrap
        className="relative"
        sidebar={[
          <SearchFilter setSearch={setSearch} />,
          <TermFilter
            title="Tag"
            terms={data.blogTags.edges}
            onChange={(active) =>
              setTaxFilter({ ...taxFilter, BLOGTAG: active })
            }
          />,
          <TermFilter
            title="Categorie"
            terms={data.blogCategories.edges}
            onChange={(active) =>
              setTaxFilter({ ...taxFilter, BLOGCATEGORY: active })
            }
          />,
          <Categories categories={data.categories} />,
        ]}
      >
        {loading && (
          <div className="bg-white absolute w-full h-full left-0 top-0 z-10 opacity-50" />
        )}
        <Title>{blog.fields?.title || 'Blog'}</Title>

        <Content content={blog.fields?.content} />

        <Posts
          posts={posts}
          fetchMore={(cursor) => {
            return fetchData(`
              query BlogMorePosts {
                ${postsQuery({
                  cursor,
                  taxQuery: getTaxQuery(taxFilter),
                  search,
                })}
              }
            `)
          }}
        />
      </Wrap>
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
      ${termsQuery('blogTags')}
      ${termsQuery('blogCategories')}
      ${mainQuery}
    }
  `)

  return { props: data }
}
