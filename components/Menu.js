import { useContext } from 'react'
import { useState } from 'react'
import Context from 'lib/Context'
import Hamburger from 'hamburger-react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import tailwind from 'tailwind.config'

export default () => {
  const [isOpen, setOpen] = useState(false)
  const { menu } = useContext(Context)

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
          lg:bg-transparent
          lg:flex-row
          lg:mx-4
          lg:opacity-100
          lg:pointer-events-auto
          lg:static
          lg:w-auto
        `}
      >
        {menu.edges.map(({ node }) => (
          <MenuItem close={() => setOpen(false)} href={node.url} key={node.id}>
            {node.label}
          </MenuItem>
        ))}
      </div>
    </div>
  )
}

export const MenuItem = ({ children, href, close }) => (
  <Link
    href={href}
    onClick={() => close()}
    className="
      border-b
      border-gray-600
      font-semibold
      hover:bg-gray-900
      hover:text-white
      justify-between
      px-5
      flex-none
      py-4
      text-gray-300
      lg:border-none
      lg:hover:bg-transparent
      lg:hover:text-brand-600
      lg:px-4
      lg:py-2
      lg:text-gray-800
    "
  >
    {children}
  </Link>
)
