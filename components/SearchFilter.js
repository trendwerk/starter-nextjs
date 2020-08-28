import { useState, useRef } from 'react'

export default function SearchFilter({ search, setSearch }) {
  const input = useRef()

  return (
    <div>
      <h3 className="mb-6">Search posts</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        setSearch(input.current.value)
      }}>
        <input className="
          border
          focus:border-gray-300
          focus:outline-none
          appearance-none
          pl-4
          pr-10
          py-2
          rounded-full
          shadow-inner
          w-full
        " type="search" ref={input} />
      </form>
    </div>
  )
}
