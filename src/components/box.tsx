import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader } from './ui/card';

interface BoxProps {
  color: string;
  title: string;
  value: number | string;
  icon: LucideIcon;
  description: string;
}

export const Box = ({
  color,
  title,
  value,
  icon: Icon,
  description,
}: BoxProps) => {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center justify-between gap-1'>
        <h5 className='text-sm font-medium'>{title}</h5>
        <Icon className={cn('size-4', color)} />
      </CardHeader>

      <div className='mt-auto'>
        <h4 className='text-2xl font-bold'>{value}</h4>
        <p className='text-muted-foreground text-xs'>{description}</p>
      </div>
    </Card>
  );
};
