import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className='bg-background border-t'>
      <div className='container flex flex-col items-center justify-between gap-4 md:flex-row'>
        <div className='flex gap-4'>
          <a href='#' className='text-muted-foreground text-sm hover:underline'>
            Terms
          </a>
          <a href='#' className='text-muted-foreground text-sm hover:underline'>
            Privacy Policy
          </a>
          <a href='#' className='text-muted-foreground text-sm hover:underline'>
            Support
          </a>
        </div>
        <div className='flex gap-4'>
          <a href='#' className='text-muted-foreground hover:text-foreground'>
            <Facebook className='h-5 w-5' />
          </a>
          <a href='#' className='text-muted-foreground hover:text-foreground'>
            <Twitter className='h-5 w-5' />
          </a>
          <a href='#' className='text-muted-foreground hover:text-foreground'>
            <Instagram className='h-5 w-5' />
          </a>
        </div>
        <div className='text-muted-foreground text-sm'>
          © 2025 PokerStats. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
