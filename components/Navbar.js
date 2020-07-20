import { useContext } from 'react'
import Context from 'components/Context'
import Link from 'next/link'
import Logo from 'components/Logo'
import Wrap from 'components/Wrap'

export default function() {
  const { app } = useContext(Context)

  return (
    <Wrap className="py-4 shadow-md" noMargin>
      <Link href="/">
        <a className="font-serif font-bold text-lg flex items-center">
          <Logo className="text-brand-600 h-8 w-8 mr-3 flex-none" />
          {app.title}
        </a>
      </Link>
    </Wrap>
  )
}
