import { useContext } from 'react'
import { useState } from 'react'
import Context from 'lib/Context'
import Hamburger from 'hamburger-react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { getMenu } from 'lib/menu'
import tailwind from 'tailwind.config'

export default () => {
  const [isOpen, setOpen] = useState(false)
  const { menuItems } = useContext(Context)

  return (
    <div
      className="
      flex
      items-center
      justify-between
      py-2
      pl-5
      shadow-md
      lg:py-4
    "
    >
      <Logo />

      <div className="pr-2 lg:hidden">
        <Hamburger
          color={tailwind.theme.colors.gray[800]}
          direction="right"
          size={18}
          rounded
          duration={0.3}
          toggle={setOpen}
          toggled={isOpen}
        />
      </div>

      <div
        className={`
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          absolute
          bg-gray-800
          duration-300
          flex
          flex-col
          last:border-none
          left-0
          top-16
          transition-opacity
          w-full
          flex-wrap
          divide-y
          divide-gray-600
          lg:divide-y-0
          lg:bg-transparent
          lg:flex-row
          lg:mx-4
          lg:opacity-100
          lg:pointer-events-auto
          lg:static
          lg:w-auto
        `}
      >
        {getMenu('MAIN', menuItems).map((item) => (
          <MenuItem item={item} close={() => setOpen(false)} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export const MenuItem = ({ item, close }) => (
  <div className="

    flex
    flex-col
    py-2
    relative
    text-gray-300

    lg:text-gray-800
  ">
    <Link
      href={item.href}
      onClick={() => close()}
      className="
        font-semibold
        hover:text-white
        px-5
        py-2
        lg:hover:text-brand-600
        lg:px-4
      "
    >
      {item.label}
    </Link>

    {(item.childItems.nodes.length > 0) && (
      <div className="
        flex
        flex-col
        lg:absolute
        lg:top-16
        lg:px-6
        lg:py-3
        lg:bg-gray-800
        lg:rounded-lg
        lg:w-64
        lg:divide-y
        lg:divide-gray-600
      ">
        {item.childItems.nodes.map((item) => (
          <Link
            href={item.href}
            onClick={() => close()}
            className="
              hover:text-white
              last:mb-1
              px-5
              py-2
              text-sm
              lg:text-gray-300
              lg:px-0
              lg:py-3
            "
            key={item.id}
          >
            {item.label}
          </Link>
        ))}
      </div>
    )}
  </div>
)
