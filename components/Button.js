import Link from 'components/Link'
import clsx from 'clsx'

export default function Button({
  children,
  className = '',
  disabled,
  onClick,
  href,
  large = false,
}) {
  const classNames = clsx(
    disabled
      ? ['bg-brand-400', 'text-brand-200']
      : ['bg-brand-600', 'hover:bg-brand-700', 'text-white'],
    'duration-200',
    'font-semibold',
    'inline-block',
    'rounded',
    'shadow-md',
    'text-center',
    'transition-colors',
    large ? 'px-8 py-4' : 'px-6 py-3 text-sm',
    !href && (disabled ? 'cursor-not-allowed' : 'cursor-pointer'),
    className
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
