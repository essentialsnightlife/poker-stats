'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className='bg-background sticky top-0 z-50 border-b'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu className='h-6 w-6' />
            <span className='sr-only'>Toggle sidebar</span>
          </Button>
          <h1 className='text-xl font-bold'>PokerStats</h1>
        </div>
        <nav className='hidden items-center gap-6 md:flex'>
          <Link to='/' className='text-sm font-medium'>
            Dashboard
          </Link>
          <Link to='/board' className='text-sm font-medium'>
            Board
          </Link>
          <a href='#' className='text-sm font-medium'>
            Statistics
          </a>
          <a href='#' className='text-sm font-medium'>
            Settings
          </a>
        </nav>
        <div className='flex items-center gap-4'>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/avatars/01.png' alt='@username' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuLabel className='font-normal'>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm leading-none font-medium'>John Doe</p>
                  <p className='text-muted-foreground text-xs leading-none'>
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
