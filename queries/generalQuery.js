export default function generalQuery() {
  return `
    app: generalSettings {
      dateFormat
      description
      language
      title
    }
    general {
      fields {
        companyName
        address
        city
        zipcode
        email
        telephone
        facebook
        instagram
        linkedin
        pinterest
        twitter
        youtube
      }
    }
    menus {
      nodes {
        name
        locations
        items: menuItems(where: {parentId: "null"}) {
          nodes {
            id
            label
            href: path
            locations
            parentId
            childItems {
              nodes {
                id
                label
                href: path
                childItems {
                  nodes {
                    id
                    label
                    path
                  }
                }
              }
            }
          }
        }
      }
    }
  `
}
