const BASE_CLASS =
  'inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'

const VARIANT_CLASS = {
  primary: 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
  danger: 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100',
}

export function Button({
  as = 'button',
  variant = 'secondary',
  className = '',
  children,
  ...props
}) {
  const Component = as
  const classes = `${BASE_CLASS} ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.secondary} ${className}`.trim()
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
