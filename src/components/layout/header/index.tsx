import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { Bell, AlignLeft } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/lib/hooks/use-mobile';

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className='bg-card/95 supports-[backdrop-filter]:bg-card/60 sticky top-0 z-10 border-b backdrop-blur'>
      <div className='container flex items-center py-2'>
        {isMobile && (
          <SidebarTrigger className='size-8'>
            <AlignLeft className='size-6' />
          </SidebarTrigger>
        )}

        <div className='ml-auto flex items-center gap-2'>
          <ModeToggle />
          <Button size='icon' variant='outline'>
            <Bell />
          </Button>
        </div>
      </div>
    </header>
  );
}
