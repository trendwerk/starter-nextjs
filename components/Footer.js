import Wrap from 'components/Wrap'

export default function({ app }) {
  return (
    <Wrap noMargin className="bg-gray-800 mt-auto py-6 text-gray-400">
      <div className="text-center w-full">
        &copy; copyright {new Date().getFullYear()} - {app.title}
      </div>
    </Wrap>
  )
}
