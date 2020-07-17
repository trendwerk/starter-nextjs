import Link from 'next/link'
import Logo from 'components/Logo'
import Wrap from 'components/Wrap'

export default function({ site }) {
  return (
    <Wrap className="mb-8 sm:mb-12 py-4 border-b border-gray-200">
      <Link href="/">
        <a className="font-serif font-bold text-lg flex items-center">
          <Logo className="text-brand-600 h-8 w-8 mr-3 flex-none" />

          {site.title}
        </a>
      </Link>
    </Wrap>
  )
}
