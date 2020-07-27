import { useState, useEffect, useRef } from 'react'
import debounce from 'lodash-es/debounce'
import Link from 'components/Link'

export default () => {
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)

  const wrapper = useRef()
  const input = useRef()

  useEffect(() => {
    const listener = (e) => {
      if (wrapper.current && ! wrapper.current.contains(e.target)) {
        reset()
        clear()
      }
    }

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener(listener)
    }
  }, [])

  const clear = () => {
    if (input.current) {
      input.current.value = ''
    }
  }

  const reset = () => {
    setError(false)
    setVisible(false)
    setResults([])
  }

  const onChange = debounce((value) => {
    ;(async () => {
      reset()

      try {
        const response = await fetch(`${process.env.WP_URL}/search/?q=${value}`)
        const data = await response.json()

        setResults(data.results)
      } catch (e) {
        setError(true)
      }

      setVisible(true)
    })()
  }, 250)

  return (
    <div className="hidden lg:flex items-center relative" ref={wrapper}>
      <div className="relative">
        <input
          type="search"
          className="w-40 border pl-4 pr-10 py-2 ml-4 rounded-full shadow-inner focus:outline-none focus:border-gray-400"
          onChange={(e) => {
            if (!e.target.value || e.target.value.length < 3) {
              reset()
              return
            }

            onChange(e.target.value)
          }}
          ref={input}
        />
        {visible && (
          <ul className="absolute top-full bg-white rounded-md shadow-md right-0 w-96 leading-snug">
            {error || !results.length ? (
              <p className="px-5 py-8 text-sm text-center">
                {error ? 'Something went wrong… Please try again later.' : 'No results found… Please try another query.'}
              </p>
            ) : (
              results.map((result) => (
                <li key={result.slug} className="transition-colors duration-200 border-b last:border-b-0 border-gray-200 hover:bg-gray-50 last:rounded-b-md first:rounded-t-md">
                  <Link
                    href={result.slug}
                    className="py-4 px-5 block"
                  >
                    <strong className="text-sm font-bold mb-2 block">
                      {result.title}
                    </strong>
                    <p className="text-gray-400 text-xs">
                      {result.summary}
                    </p>
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <Icon />
    </div>
  )
}

const Icon = () => (
  <svg
    className="w-4 h-4 absolute right-0 mr-4 pointer-events-none"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)
