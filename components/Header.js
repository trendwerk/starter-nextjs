import Wrap from 'components/Wrap'
import Link from 'next/link'

export default function ({ site }) {
  return (
    <Wrap className=" bg-gray-800 mb-8 py-6 text-white">
      <Link href="/">
        <a className="font-semibold text-xl">
          {site.title}
        </a>
      </Link>
    </Wrap>
  )
}
