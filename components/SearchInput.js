import { forwardRef } from 'react'

const SearchInput = forwardRef(({ className, onChange }, ref) => {
  return (
    <input
      type="search"
      className={`
        border
        focus:border-gray-300
        focus:outline-none
        appearance-none
        pl-4
        pr-10
        py-2
        rounded-full
        shadow-inner
        ${className}
      `}
      onChange={onChange}
      ref={ref}
    />
  )
})

export default SearchInput
