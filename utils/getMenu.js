const getMenu = function (location, menus) {
  // Filter menu items by menu location and menu parent
  return menus.nodes.filter((menu) => {
    return menu.locations.includes(location)
  })[0]
}

const getSubmenu = (post, menus) => {
  const item = getMenu('MAIN', menus).items.nodes.filter((node) => {
    const isEqual = (node) => node.href == post.uri

    if (isEqual(node)) {
      return true
    }

    if (node.childItems.nodes.length) {
      return node.childItems.nodes.filter(isEqual).length
    }
  })

  return item.length ? item[0] : null
}

export default getMenu

export { getSubmenu }
