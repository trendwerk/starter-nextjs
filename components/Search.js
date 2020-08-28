import { useState, useEffect, useRef } from 'react'
import debounce from 'lodash-es/debounce'
import Link from 'components/Link'
import SearchInput from 'components/SearchInput'
import SearchIcon from 'components/SearchIcon'

export default function Search() {
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)

  const wrapper = useRef()
  const input = useRef()

  useEffect(() => {
    const listener = (e) => {
      if (wrapper.current && !wrapper.current.contains(e.target)) {
        clear()
      }
    }

    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [])

  const clear = () => {
    reset()

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
        <SearchInput
          className="w-40 ml-4"
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
          <div
            className="
            absolute
            bg-white
            divide-y
            right-0
            rounded-md
            mt-2
            shadow
            top-full
            w-96
          "
          >
            {error || !results.length ? (
              <p className="px-5 py-8 text-sm text-center">
                {error
                  ? 'Something went wrong… Please try again later.'
                  : 'No results found… Please try another query.'}
              </p>
            ) : (
              results.map((result) => (
                <div
                  key={result.slug}
                  className="
                  duration-200
                  first:rounded-t-md
                  hover:bg-gray-50
                  last:rounded-b-md
                  transition-colors
                "
                >
                  <Link
                    href={result.slug}
                    className="py-4 px-5 block"
                    onClick={() => reset()}
                  >
                    <strong className="text-sm font-bold mb-2 block">
                      {result.title}
                    </strong>
                    <p className="text-gray-400 text-xs">{result.summary}</p>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute right-0 mr-4">
        <SearchIcon />
      </div>
    </div>
  )
}
