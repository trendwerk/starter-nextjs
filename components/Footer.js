import { useContext } from 'react'
import Data from 'components/Data'
import Wrap from 'components/Wrap'

const Footer = () => {
  const { app } = useContext(Data)
  const { general } = useContext(Data)

  return (
    <Wrap className="bg-gray-800 mt-auto py-6 text-gray-400" noMargin>
      <div className="text-center w-full">
        &copy; copyright {new Date().getFullYear()} - {general.companyName || app.title}
      </div>
    </Wrap>
  )
}

export default Footer
