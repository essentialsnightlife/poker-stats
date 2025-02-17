import { useMatchRoute } from '@tanstack/react-router';
import { Home, Users, PlayCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '../ui/sidebar';
import { User } from './user';

export const Sider = () => {
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

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton
          size='lg'
          asChild
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <Link to='/'>
            <img
              src='https://i.pinimg.com/736x/39/91/e5/3991e53761dd9fee0d874cde9d512a8b.jpg'
              alt='Poker stats'
              className='aspect-square size-8 rounded-lg border'
            />
            <span className='font-semibold'>PokerStats</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.map(({ to, icon: Icon, label }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  asChild
                  isActive={!!matchRoute({ to, fuzzy: true })}
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
        <User />
      </SidebarFooter>
    </Sidebar>
  );
};
