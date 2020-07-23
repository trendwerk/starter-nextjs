export function getMenu(menu, menuItems) {
  // Filter menu items by menu location and menu parent
  return menuItems.nodes.filter((item) => {
    return item.locations.includes(menu) && item.parentId === null
  })
}
