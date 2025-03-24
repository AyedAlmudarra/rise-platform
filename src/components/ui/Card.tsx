import React from 'react';
import { cn } from '@/lib/utils';

// Card container
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  elevated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, bordered = false, elevated = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white rounded-lg overflow-hidden',
        bordered && 'border border-gray-200',
        elevated && 'shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

// Card header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, withBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4',
        withBorder && 'border-b border-gray-200',
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// Card title
export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  if (!children) {
    console.warn('CardTitle must have content for accessibility');
  }
  return (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-gray-900', className)}
      {...props}
    >
      {children || 'Title'} {/* Fallback to ensure content exists */}
    </h3>
  );
});
CardTitle.displayName = 'CardTitle';

// Card description
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500 mt-1', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// Card content
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

// Card footer
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, withBorder = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4',
        withBorder && 'border-t border-gray-200',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter'; 