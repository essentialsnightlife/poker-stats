import { Button } from '@/components/ui/button';
import { links } from './constants';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='size-6' />
          <span className='sr-only'>Toggle sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>PokerStats</SheetTitle>
        </SheetHeader>
        <nav className='space-y-2 px-4 py-4'>
          {links.map((item) => (
            <SheetTrigger key={item.to} asChild>
              <Link
                to={item.to}
                className='hover:bg-accent flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium'
              >
                <item.icon className='h-5 w-5' />
                {item.label}
              </Link>
            </SheetTrigger>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
