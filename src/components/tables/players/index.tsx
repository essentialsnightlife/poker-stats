'use client';

import { useGetPlayers } from '@/lib/services/players';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Inbox } from 'lucide-react';

export const Players = () => {
  const { data, isLoading } = useGetPlayers();

  return (
    <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => <Loader key={index} />)
      ) : data && data?.length > 0 ? (
        data.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className='cursor-pointer transition-shadow duration-300 hover:shadow-md'
              asChild
            >
              <Link
                to={`/players/${player.id}`}
                className='flex h-full flex-col items-center gap-1'
              >
                <Avatar className='mb-4 size-24'>
                  <AvatarImage
                    src={player.img}
                    className='object-cover'
                    alt={player.name}
                  />
                  <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className='text-xl font-semibold'>{player.name}</h2>
                {player.nickname && (
                  <p className='text-muted-foreground text-sm'>
                    {player.nickname}
                  </p>
                )}
              </Link>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className='text-muted-foreground col-span-full flex h-32 w-full flex-col items-center justify-center'>
          <Inbox className='size-10' />
          <p className='font-medium'>No results</p>
        </div>
      )}
    </section>
  );
};

const Loader = () => (
  <Card className='flex flex-col items-center gap-1'>
    <Skeleton className='mb-4 size-24 rounded-full' />

    <Skeleton className='mb-1 h-6 w-24' />
    <Skeleton className='h-5 w-14' />
  </Card>
);
