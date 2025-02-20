import { useMatchRoute } from '@tanstack/react-router';
import { Home, Users, PlayCircle, X } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '../ui/sidebar';
import { User } from './user';
import { useAppStore } from '@/lib/store/app';
import { useIsMobile } from '@/lib/hooks/use-mobile';

export const Sider = () => {
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useAppStore();
  const matchRoute = useMatchRoute();

  const menu = [
    {
      to: '/',
      icon: Home,
      label: 'Home',
    },
    {
      to: '/players',
      icon: Users,
      label: 'Players',
    },
    {
      to: '/games',
      icon: PlayCircle,
      label: 'Games',
    },
  ];

  const handleToggleMobileMenu = () => {
    if (!isMobile) return;
    setOpenMobile(!openMobile);
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex-row items-center justify-between'>
        <Link to='/'>
          <img src='/logo.svg' alt='Poker stats' className='size-10' />
        </Link>

        {isMobile ? (
          <SidebarTrigger>
            <X />
          </SidebarTrigger>
        ) : (
          <SidebarTrigger className='[[data-state=collapsed]_&]:hidden' />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.map(({ to, icon: Icon, label }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  asChild
                  isActive={!!matchRoute({ to, fuzzy: true })}
                  onClick={handleToggleMobileMenu}
                >
                  <Link to={to}>
                    <Icon />
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarTrigger className='hidden [[data-state=collapsed]_&]:flex' />

        <User />
      </SidebarFooter>
    </Sidebar>
  );
};
