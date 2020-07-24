import debounce from 'lodash-es/debounce'
import { useState } from 'react'
import Link from 'components/Link'

export default () => {
  const [results, setResults] = useState([])
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)

  const reset = () => {
    setError(false)
    setVisible(false)
    setResults([])
  }

  const onChange = debounce((value) => {
    reset()

    try {
      // Fetch

      setResults([1, 2, 3])
    } catch (e) {
      // setError(true)
    }

    setVisible(true)
  }, 250)

  return (
    <div className="hidden lg:flex items-center relative">
      <div className="relative">
        <input
          type="search"
          className="w-40 border pl-4 pr-10 py-2 ml-4 rounded-full shadow-inner focus:outline-none focus:border-gray-400"
          onChange={(e) => {
            if (!e.target.value) {
              reset()
              return
            }

            onChange(e.target.value)
          }}
        />
        {visible && (
          <ul className="absolute top-full bg-white rounded-md shadow-md right-0 w-96 leading-snug">
            {error ? (
              <p className="p-8 text-sm">
                Something went wrong… Please try again later.
              </p>
            ) : (
              results.map((result, key) => (
                <li key={key}>
                  <Link
                    href="/"
                    className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors duration-200 px-5 block"
                  >
                    <strong className="text-sm font-bold mb-2 block">
                      Result
                    </strong>
                    <p className="text-gray-400 text-xs">
                      Proin vel nunc non velit rutrum euismod. Aenean et nulla
                      efficitur, tempor turpis sed…
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
