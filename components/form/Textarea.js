export default function Textarea({ onChange, value }) {
  return (
    <textarea
      className="
        form-textarea
        md:w-3/4
        rounded
        focus:ring-0
        border-gray-300
        focus:border-gray-400
      "
      onChange={onChange}
      rows="4"
      value={value}
    ></textarea>
  )
}
