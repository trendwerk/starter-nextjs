import classnames from 'classnames'

export default function Input({ className, error, onChange, type, value }) {
  type = type === 'email' ? 'email' : 'text'

  return (
    <input
      className={classnames(
        'form-input rounded focus:ring-0 focus:border-gray-400',
        error ? 'border-red-500' : 'border-gray-300',
        className
      )}
      onChange={onChange}
      type={type}
      value={value}
    />
  )
}
