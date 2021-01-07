import { useContext } from 'react'
import GeneralContext from 'components/GeneralContext'
import getMenu from 'functions/getMenu'
import Link from 'components/Link'
import SocialLinks from 'components/SocialLinks'
import Wrap from 'components/Wrap'

export default function Footer() {
  const { app } = useContext(GeneralContext)
  const { general } = useContext(GeneralContext)
  const { menus } = useContext(GeneralContext)

  const menu1 = getMenu('FOOTER1', menus)
  const menu2 = getMenu('FOOTER2', menus)
  const menu3 = getMenu('FOOTER3', menus)
  const menu4 = getMenu('FOOTER4', menus)
  const menu = getMenu('FOOTER', menus)

  let footerMenus = []

  if (menu1?.items.nodes.length > 0) {
    footerMenus.push({
      id: '1',
      name: menu1.name,
      items: menu1.items.nodes,
      breakpoint: 'sm',
    })
  }

  if (menu2?.items.nodes.length > 0) {
    footerMenus.push({
      id: '2',
      name: menu2.name,
      items: menu2.items.nodes,
      breakpoint: 'md',
    })
  }

  if (menu3?.items.nodes.length > 0) {
    footerMenus.push({
      id: '3',
      name: menu3.name,
      items: menu3.items.nodes,
      breakpoint: 'lg',
    })
  }

  if (menu4?.items.nodes.length > 0) {
    footerMenus.push({
      id: '4',
      name: menu4.name,
      items: menu4.items.nodes,
      breakpoint: 'xl',
    })
  }

  return (
    <Wrap className="bg-gray-800 mt-auto" noMargin>
      <div className="border-b border-gray-600 py-12 flex justify-between">
        <div className="min-w-40">
          <div className="mb-8">
            <h3 className="mb-6 text-white">Contact</h3>

            {general.address && (
              <p className="mb-6 text-white">
                <strong>{general.companyName || app.title}</strong>
                <br />
                {general.address}
                <br />
                {general.zipcode} {general.city}
              </p>
            )}

            {(general.email || general.telephone) && (
              <p className="text-white">
                {general.email && (
                  <>
                    Email:{' '}
                    <Link
                      href={`mailto:${general.email}`}
                      className="hover:text-brand-500"
                    >
                      {general.email}
                    </Link>
                    <br />
                  </>
                )}
                {general.telephone && (
                  <>
                    Telephone:{' '}
                    <Link
                      href={`tel:${general.telephone.replace(/[^0-9.]/g, '')}`}
                      className="hover:text-brand-500"
                    >
                      {general.telephone}
                    </Link>
                  </>
                )}
              </p>
            )}
          </div>

          <SocialLinks />
        </div>

        {footerMenus.map((menu) => (
          <div
            className={`ml-10 hidden ${menu.breakpoint}:block`}
            key={menu.id}
          >
            <h3 className="mb-4 text-white">{menu.name}</h3>

            <div className="flex flex-col items-start">
              {menu.items.map((item) => (
                <Link
                  className={`
                    text-white
                      py-2
                      hover:text-brand-500
                  `}
                  href={item.href}
                  key={item.id}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          lg:flex-row
          py-6
          w-full
        text-white
        "
      >
        <div className="mb-4 lg:mb-0 text-center">
          &copy; copyright {new Date().getFullYear()} -{' '}
          {general.companyName || app.title}
        </div>

        {menu && menu.items.nodes.length > 0 && (
          <div className="flex flex-wrap justify-center">
            {menu.items.nodes.map((item) => (
              <Link
                className={`
                  text-white
                    py-1
                    px-2
                    hover:text-brand-500
                    lg:px-0
                    lg:ml-4
                `}
                href={item.href}
                key={item.id}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Wrap>
  )
}
