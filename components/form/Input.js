export default function Input({ onChange, type = 'text', value }) {
  return (
    <input
      className="
        form-input
        md:w-1/2
        rounded
        focus:ring-0
        border-gray-300
        focus:border-gray-400
      "
      onChange={onChange}
      type={type}
      value={value}
    />
  )
}
