import { useState } from 'react'
import Hamburger from 'hamburger-react'
import Link from 'components/Link'
import Search from 'components/Search'
import Logo from 'components/Logo'
import getMenu from 'utils/getMenu'
import { useRouter } from 'next/router'
import getLink from 'utils/getLink'

const Menu = ({ items }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div
      className="
      flex
      h-16
      items-center
      justify-between
      lg:h-20
      pl-5
      shadow
    "
    >
      <Logo />

      <div className="pr-2 lg:hidden">
        <Hamburger
          direction="right"
          label="Menu"
          size={18}
          rounded
          duration={0.3}
          toggle={setOpen}
          toggled={isOpen}
        />
      </div>

      <div
        className={`
          ${isOpen ? 'flex' : 'hidden'}
          absolute
          bg-gray-800
          divide-gray-600
          divide-y
          flex-col
          flex-wrap
          left-0
          top-16
          w-full
          z-10
          lg:bg-transparent
          lg:divide-y-0
          lg:flex
          lg:flex-row
          lg:h-full
          lg:mx-4
          lg:static
          lg:w-auto
        `}
      >
        <Items items={items} setOpen={setOpen} />
        <Search />
      </div>
    </div>
  )
}

export default Menu

const Items = ({ items, setOpen }) => {
  const menu = getMenu('MAIN', items)
  const { asPath } = useRouter()

  const getChildren = (item) =>
    item.childItems.nodes.length ? item.childItems.nodes : false

  const isCurrent = (item) => {
    const equal = (item) => asPath === getLink(item.href).as

    if (equal(item)) {
      return true
    }

    return getChildren(item) ? getChildren(item).some(equal) : false
  }

  return menu.map((item) => (
    <div
      className={`
      flex
      flex-col
      group
      justify-center
      relative
      lg:h-full
    `}
      key={item.id}
    >
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        className={`
          flex
          font-semibold
          hover:text-white
          items-center
          px-5
          py-4
          lg:h-full
          lg:hover:text-brand-600
          lg:px-4
          lg:py-0
          ${
            isCurrent(item)
              ? 'text-brand-500 lg:text-brand-600'
              : 'text-gray-300 lg:text-gray-800'
          }
        `}
      >
        {item.label}
      </Link>

      {getChildren(item) && (
        <div
          className="
          -mt-2
          flex
          flex-col
          mb-3
          lg:-translate-x-1/2
          lg:absolute
          lg:bg-gray-800
          lg:divide-gray-600
          lg:divide-y
          lg:group-hover:flex
          lg:hidden
          lg:left-1/2
          lg:mb-0
          lg:mt-2
          lg:px-5
          lg:pt-3
          lg:pb-4
          lg:rounded
          lg:top-16
          lg:transform
          lg:w-64
          lg:z-10
        "
        >
          {getChildren(item).map((item) => (
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className={`
                ${true ? 'ef' : 'ef'}
                hover:text-white
                px-5
                py-2
                text-sm
                lg:px-0
                lg:py-3
                ${isCurrent(item) ? 'text-brand-500' : 'text-gray-300'}
              `}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  ))
}
