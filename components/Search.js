export default () => (
  <div className="hidden lg:flex items-center relative">
    <input
      type="search"
      className="w-40 border pl-4 pr-10 py-2 ml-4 rounded-full shadow-inner focus:outline-none focus:border-gray-400"
    />
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
  </div>
)
