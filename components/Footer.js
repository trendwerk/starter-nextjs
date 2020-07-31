import { useContext } from 'react'
import Data from 'components/Data'
import Wrap from 'components/Wrap'

const Footer = () => {
  const { app } = useContext(Data)
  const { general } = useContext(Data)

  return (
    <Wrap className="bg-gray-800 mt-auto" noMargin>
      <div className="border-b border-gray-600 py-12">
        <h4 className="text-gray-200 mb-6">Contact</h4>

        {general.address && (
          <p className="mb-6 text-gray-400">
            <strong>{general.companyName || app.title}</strong><br/>
            {general.address}<br/>
            {general.zipcode} {general.city}
          </p>
        )}

        {general.email || general.telephone && (
          <p className="text-gray-400">
            {general.email && <>Email: {general.email}<br/></>}
            {general.telephone && <>Telephone: {general.telephone}</>}
          </p>
        )}
      </div>
      <div className="py-6 text-center w-full text-gray-400">
        &copy; copyright {new Date().getFullYear()} - {general.companyName || app.title}
      </div>
    </Wrap>
  )
}

export default Footer
