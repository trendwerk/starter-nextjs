import Link from 'next/link'
import Logo from 'components/Logo'
import Wrap from 'components/Wrap'

export default function({ app }) {
  return (
    <Wrap className="py-4 border-b border-gray-200">
      <Link href="/">
        <a className="font-serif font-bold text-lg flex items-center">
          <Logo className="text-brand-600 h-8 w-8 mr-3 flex-none" />
          {app.title}
        </a>
      </Link>
    </Wrap>
  )
}
