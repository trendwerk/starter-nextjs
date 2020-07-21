import { useContext } from 'react'
import { useState, useEffect } from 'react'
import Context from 'lib/Context'
import Hamburger from 'hamburger-react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import Wrap from 'components/Wrap'

export default () => {
  const [isOpen, setOpen] = useState(false)
  const { menu } = useContext(Context)

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0)
      document.body.classList.add('h-full', 'overflow-y-hidden')
      document.documentElement.classList.add('h-full', 'overflow-y-hidden')
    } else {
      document.body.classList.remove('h-full', 'overflow-y-hidden')
      document.documentElement.classList.remove('h-full', 'overflow-y-hidden')
    }

    return () => {
      document.body.classList.remove('h-full', 'overflow-y-hidden')
      document.documentElement.classList.remove('h-full', 'overflow-y-hidden')
    }
  }, [isOpen])

  return (
    <Wrap className="py-4 shadow-md flex" noMargin>
      <Logo />

      <div
        className="
        md:hidden
        z-30
      "
      >
        <Hamburger
          duration={0.3}
          size={18}
          rounded
          direction="right"
          toggled={isOpen}
          toggle={setOpen}
          color={isOpen ? 'white' : '#2d3748'}
        />
      </div>
      <div
        className={`${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}
        bg-gray-800
        duration-300
        ease-out
        fixed
        flex
        flex-col
        font-semibold
        h-full
        md:bg-transparent
        md:flex-row
        md:h-auto
        md:items-center
        md:mr-6
        md:p-0
        md:shadow-none
        md:static
        md:text-sm
        md:translate-x-0
        md:w-auto
        px-8
        py-16
        right-0
        top-0
        transform
        transition-transform
        w-64
        z-20
      `}
      >
        {menu.edges.map(({ node }) => (
          <Item href={node.url} className="link" arrow="right">
            {node.label}
          </Item>
        ))}
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`z-10 fixed md:hidden transition-opacity duration-300 top-0 left-0 w-full h-full bg-black ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
      />
    </Wrap>
  )
}


export const Item = ({ children, className = '', href, normalCase, close }) => (
  <Link href={href}
    onClick={() => close()}
    className={`
      ${!normalCase && 'lowercase'}
      flex
      hover:text-red-500
      items-center
      md:mx-0
      md:text-gray-800
      md:text-sm
      md:px-2
      py-2
      rounded-full
      text-white
      ${className}
    `}
  >
    {children}
  </Link>
)

