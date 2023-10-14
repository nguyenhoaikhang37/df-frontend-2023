import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import * as React from 'react'
import { cn } from '../../utils/functions'
import Icon from './icon'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        none: 'h-auto px-0',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  iconName?: keyof typeof dynamicIconImports
  iconPosition?: 'left' | 'right'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconName,
      iconPosition = 'left',
      loading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isShowIcon = iconName || loading

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {isShowIcon && iconPosition === 'left' && (
          <Icon
            name={loading ? 'loader-2' : iconName!}
            className={cn('mr-2 h-4 w-4', {
              'animate-spin': loading,
            })}
          />
        )}
        {props.children}
        {isShowIcon && iconPosition === 'right' && (
          <Icon
            name={loading ? 'loader-2' : iconName!}
            className={cn('ml-2 h-4 w-4', {
              'animate-spin': loading,
            })}
          />
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export default Button
