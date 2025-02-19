import { Button } from '@/components/ui/button';
import { ModeToggle } from './mode-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';

export function Header() {
  return (
    <header className='bg-card/95 supports-[backdrop-filter]:bg-card/60 sticky top-0 z-10 border-b backdrop-blur'>
      <div className='container flex items-center justify-between py-2'>
        <SidebarTrigger />
        <div className='flex items-center gap-2'>
          <ModeToggle />
          <Button size='icon' variant='outline'>
            <Bell />
          </Button>
        </div>
      </div>
    </header>
  );
}
