import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { FC, PropsWithChildren } from 'react';
import { Sider } from './sider';
import { Header } from './header';
import { Footer } from './footer';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <Sider />

      <SidebarInset>
        <Header />
        <div className='container flex-1'>{children}</div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};
