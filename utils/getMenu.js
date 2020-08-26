const getMenu = function (location, menus) {
  // Filter menu items by menu location and menu parent
  return menus.nodes.filter((menu) => {
    return menu.locations.includes(location)
  })[0]
}

export default getMenu
