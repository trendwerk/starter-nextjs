import Link from 'components/Link'
import classnames from 'classnames'

export default function Button({
  children,
  className = '',
  disabled,
  onClick,
  href,
}) {
  const classNames = classnames(
    `
      duration-200
      font-semibold
      inline-block
      rounded
      shadow-md
      text-center
      transition-colors
      leading-normal
      px-6
      py-3
    `,
    !href && (disabled ? 'cursor-not-allowed' : 'cursor-pointer'),
    className,
    disabled
      ? ['bg-brand-400 text-brand-200']
      : ['bg-brand-600 hover:bg-brand-700 text-white']
  )

  return href ? (
    <Link className={classNames} href={href} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  )
}
