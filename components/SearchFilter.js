import { useState, useRef } from 'react'
import SearchInput from 'components/SearchInput'
import SearchIcon from 'components/SearchIcon'

export default function SearchFilter({ search, setSearch }) {
  const input = useRef()

  return (
    <div>
      <h3 className="mb-6">Search posts</h3>
      <form
        className="relative flex items-center"
        onSubmit={(e) => {
          e.preventDefault()
          setSearch(input.current.value)
        }}
      >
        <SearchInput className="w-full" ref={input} />
        <button
          className="absolute right-0 mr-2 p-2 focus:outline-none"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  )
}
