import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({
  className,
  children,
  title,
  ...props
}: React.ComponentProps<'div'> & Partial<{ title: string }>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'bg-card text-card-foreground rounded-xl border p-3 md:p-4 lg:p-6',
        title && 'space-y-3',
        className,
      )}
      {...props}
    >
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn('mb-3 flex gap-1.5', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h3
      data-slot='card-title'
      className={cn(
        'text-base leading-none font-semibold tracking-tight md:text-lg lg:text-xl',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
