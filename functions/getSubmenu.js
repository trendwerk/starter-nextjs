import getMenu from 'functions/getMenu'

export default function getSubMenu(post, menus) {
  const item = getMenu('MAIN', menus).items.nodes.filter((node) => {
    const isEqual = (node) => node.href == post.uri

    if (!node.childItems.nodes.length) {
      return
    }

    if (isEqual(node)) {
      return true
    }

    return node.childItems.nodes.filter(isEqual).length
  })

  return item.length ? item[0] : null
}
