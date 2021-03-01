import classnames from 'classnames'

export default function Textarea({ className, error, onChange, value }) {
  return (
    <textarea
      className={classnames(
        'form-textarea rounded focus:ring-0 focus:border-gray-400',
        error ? 'border-red-500' : 'border-gray-300',
        className
      )}
      onChange={onChange}
      rows="4"
      value={value}
    ></textarea>
  )
}
