export function getMenu(menu, menuItems,) {
  return menuItems.nodes.filter(item => {
    return ((item.locations.includes(menu)) && (item.parentId === null) )
  })
}
