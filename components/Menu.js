import { useContext } from 'react'
import { useState } from 'react'
import Context from 'components/Context'
import Hamburger from 'hamburger-react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { getMenu } from 'lib/menu'

export default () => {
  const [isOpen, setOpen] = useState(false)
  const { menuItems } = useContext(Context)
  const menu = getMenu('MAIN', menuItems)

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
          last:border-none
          left-0
          top-16
          w-full
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
        {menu.map((item) => {
          const children =
            item.childItems.nodes.length > 0 && item.childItems.nodes

          return (
            <div
              className="
              flex
              flex-col
              group
              justify-center
              relative
              text-gray-300
              lg:h-full
              lg:text-gray-800
            "
              key={item.id}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="
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
                "
              >
                {item.label}
              </Link>

              {children && (
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
                "
                >
                  {children.map((item) => (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        hover:text-white
                        px-5
                        py-2
                        text-sm
                        lg:px-0
                        lg:py-3
                        lg:text-gray-300
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
        })}
      </div>
    </div>
  )
}
