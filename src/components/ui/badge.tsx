import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-forest text-beige-50',
        secondary: 'border-transparent bg-beige-200 text-forest',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'border-gold text-gold',
        gold: 'border-transparent bg-gold text-white',
        new: 'border-transparent bg-forest text-beige-50 uppercase tracking-wider',
        sale: 'border-transparent bg-red-600 text-white uppercase tracking-wider',
        bestseller: 'border-transparent bg-gold text-white uppercase tracking-wider',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
