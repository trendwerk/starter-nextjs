import postQuery from 'queries/postQuery'

export default function postQuery() {
  return `
    author {
      node {
        name
      }
    }
    content
    date
    dateFormatted
    fields {
      headerImage {
        url:sourceUrl
      }
      metaDescription
      pageTitle
      summary
      summaryImage {
        url:sourceUrl
      }
      summaryTitle
    }
    id
    modified
    summary
    title
    uri
  `
}
