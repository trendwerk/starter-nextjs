import Wrap from 'components/Wrap'

export default function () {
  return (
    <Wrap className=" bg-gray-800 mt-auto py-6 text-gray-400">
      <div className=" text-center w-full">
        &copy; copyright {new Date().getFullYear()} - [sitename]
      </div>
    </Wrap>
  )
}
