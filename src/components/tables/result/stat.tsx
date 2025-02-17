import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LucideIcon } from 'lucide-react';

export const Stat = ({
  title,
  value,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string | number;
  loading: boolean;
  icon: LucideIcon;
}) => {
  return (
    <Card>
      <CardHeader className='items-center justify-between'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <div className='bg-muted rounded-full p-2'>
          <Icon className='text-muted-foreground size-6' />
        </div>
      </CardHeader>

      {loading ? (
        <Skeleton className='h-8 w-24' />
      ) : (
        <p className='text-2xl font-bold'>{value}</p>
      )}
    </Card>
  );
};
