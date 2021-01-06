import termQuery from 'queries/termQuery'

export default function termsQuery({ taxonomy = '' } = {}) {
  return `
  ${taxonomy}(where: { parent: 0 }) {
      edges {
        node {
          ${termQuery()}
        }
      }
    }
  `
}
