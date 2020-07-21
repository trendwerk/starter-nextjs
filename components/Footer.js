import { useContext } from 'react'
import Context from 'lib/Context'
import Wrap from 'components/Wrap'

export default () => {
  const { app } = useContext(Context)

  return (
    <Wrap className="bg-gray-800 mt-auto py-6 text-gray-400" noMargin>
      <div className="text-center w-full">
        &copy; copyright {new Date().getFullYear()} - {app.title}
      </div>
    </Wrap>
  )
}
