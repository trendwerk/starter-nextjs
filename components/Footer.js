import { useContext } from 'react'
import Data from 'components/Data'
import getMenu from 'utils/getMenu'
import Link from 'components/Link'
import SocialLinks from 'components/SocialLinks'
import Wrap from 'components/Wrap'

const Footer = () => {
  const { app } = useContext(Data)
  const { general } = useContext(Data)
  const { menuItems } = useContext(Data)

  const menu1 = getMenu('FOOTER1', menuItems);
  const menu2 = getMenu('FOOTER2', menuItems);
  const menu3 = getMenu('FOOTER3', menuItems);
  const menu4 = getMenu('FOOTER4', menuItems);
  const menu = getMenu('FOOTER', menuItems);

  let menus = []

  if (menu1.length > 0) {
    menus.push({
      id: '1',
      items: menu1,
      breakpoint: 'sm'
    })
  }

  if (menu2.length > 0) {
    menus.push({
      id: '2',
      items: menu2,
      breakpoint: 'md'
    })
  }

  if (menu3.length > 0) {
    menus.push({
      id: '3',
      items: menu3,
      breakpoint: 'lg'
    })
  }

  if (menu4.length > 0) {
    menus.push({
      id: '4',
      items: menu4,
      breakpoint: 'xl'
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
                <strong>{general.companyName || app.title}</strong><br/>
                {general.address}<br/>
                {general.zipcode} {general.city}
              </p>
            )}

            {(general.email || general.telephone) && (
              <p className="text-white">
                {general.email && <>Email: <Link
                  href={`mailto:${general.email}`}
                  className="hover:text-brand-500"
                >
                  {general.email}
                </Link><br/></>}
                {general.telephone && <>Telephone: <Link
                    href={`tel:${general.telephone.replace(/[^0-9.]/g, "")}`}
                    className="hover:text-brand-500"
                  >
                    {general.telephone}
                  </Link></>}
              </p>
            )}
          </div>

          <SocialLinks />
        </div>

        {menus.map(menu => (
          <div className={`ml-10 hidden ${menu.breakpoint}:block`} key={menu.id}>
            <h3 className="mb-4 text-white">[Menu title]</h3>

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

      <div className="
        flex
        flex-col
        items-center
        justify-between
        lg:flex-row
        py-6
        w-full
      text-white
      ">
        <div className="mb-4 lg:mb-0 text-center">&copy; copyright {new Date().getFullYear()} - {general.companyName || app.title}</div>

        {menu.length > 0 && (
          <div className="flex flex-wrap justify-center">
            {menu.map((item) => (
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

export default Footer
