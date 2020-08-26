import { useContext } from 'react'
import Data from 'components/Data'
import SocialLinks from 'components/SocialLinks'
import Wrap from 'components/Wrap'

const Footer = () => {
  const { app } = useContext(Data)
  const { general } = useContext(Data)

  return (
    <Wrap className="bg-gray-800 mt-auto" noMargin>
      <div className="border-b border-gray-600 py-12 flex">
        <div>
          <div className="mb-6">
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
                {general.email && <>Email: {general.email}<br/></>}
                {general.telephone && <>Telephone: {general.telephone}</>}
              </p>
            )}
          </div>

          <SocialLinks />
        </div>
      </div>

      <div className="py-6 text-center w-full text-gray-400">
        &copy; copyright {new Date().getFullYear()} - {general.companyName || app.title}
      </div>
    </Wrap>
  )
}

export default Footer
