import classnames from 'classnames'

export default function Textarea({ className, onChange, value }) {
  return (
    <textarea
      className={classnames(
        `
          form-textarea
          rounded
          focus:ring-0
          border-gray-300
          focus:border-gray-400
        `,
        className
      )}
      onChange={onChange}
      rows="4"
      value={value}
    ></textarea>
  )
}
