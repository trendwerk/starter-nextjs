import classnames from 'classnames'

export default function Input({ className, onChange, type = 'text', value }) {
  return (
    <input
      className={classnames(
        `
          form-input
          rounded
          focus:ring-0
          border-gray-300
          focus:border-gray-400
        `,
        className
      )}
      onChange={onChange}
      type={type}
      value={value}
    />
  )
}
