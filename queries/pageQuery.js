export default function pageQuery() {
  return `
    title
    uri
    content
    fields {
      headerImage {
        url:sourceUrl
      }
      pageTitle
      metaDescription
    }
  `
}
