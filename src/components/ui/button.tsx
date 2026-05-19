import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-forest text-beige-50 hover:bg-forest-light shadow-soft hover:shadow-luxury',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-forest bg-transparent text-forest hover:bg-forest hover:text-beige-50',
        secondary: 'bg-beige-200 text-forest hover:bg-beige-300',
        ghost: 'hover:bg-beige-200 hover:text-forest',
        link: 'text-forest underline-offset-4 hover:underline',
        gold: 'bg-gold text-white hover:bg-gold-dark shadow-luxury hover:shadow-luxury-lg',
        'gold-outline': 'border border-gold bg-transparent text-gold hover:bg-gold hover:text-white',
        luxury: 'bg-forest text-beige-50 uppercase tracking-[0.15em] text-xs font-medium hover:bg-forest-light',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-10 text-base',
        xl: 'h-14 px-12 text-sm uppercase tracking-[0.15em]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
