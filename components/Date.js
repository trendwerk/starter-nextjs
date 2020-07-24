export default ({ className = '', timestamp }) => {
  const date = new Date(timestamp)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return (
    <div className={`
      ${className}
      font-semibold
      text-gray-400
      tracking-wide
      uppercase
    `}>
      {day} {month} {year}
    </div>
  )
}