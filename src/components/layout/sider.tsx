import { useMatchRoute } from '@tanstack/react-router';
import { ClipboardPenLine, Home, PlayCircle, Users, X } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
} from '../ui/sidebar';
import { User } from './user';
import { useAppStore } from '@/lib/store/app';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { ROUTES } from '@/lib/constants';

const PRIMARY_SIDEBAR_MENU_ITEMS = [
  {
    to: ROUTES.home,
    icon: Home,
    label: 'Home',
  },
  {
    to: ROUTES.players,
    icon: Users,
    label: 'Players',
  },
  {
    to: ROUTES.games,
    icon: PlayCircle,
    label: 'Games',
  },
] as const;

const RECORD_RESULT_MENU_ITEM = {
  to: ROUTES.recordResult,
  icon: ClipboardPenLine,
  label: 'Record Result',
} as const;
const RecordResultIcon = RECORD_RESULT_MENU_ITEM.icon;

export const Sider = () => {
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useAppStore();
  const matchRoute = useMatchRoute();
  const isRecordResultRoute = !!matchRoute({ to: ROUTES.recordResult });
  const isMenuItemActive = (to: (typeof ROUTES)[keyof typeof ROUTES]) => {
    if (to === ROUTES.home || to === ROUTES.recordResult) {
      return !!matchRoute({ to });
    }
    if (to === ROUTES.games && isRecordResultRoute) return false;
    return !!matchRoute({ to, fuzzy: true });
  };

  const handleToggleMobileMenu = () => {
    if (!isMobile) return;
    setOpenMobile(!openMobile);
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex-row items-center justify-between [[data-state=collapsed]_&]:justify-center'>
        <Link to='/' className='[[data-state=collapsed]_&]:hidden'>
          <img src='/logo.svg' alt='Poker stats' className='size-10' />
        </Link>

        {isMobile ? (
          <SidebarTrigger>
            <X />
          </SidebarTrigger>
        ) : (
          <SidebarTrigger />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {PRIMARY_SIDEBAR_MENU_ITEMS.map(({ to, icon: Icon, label }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  asChild
                  isActive={isMenuItemActive(to)}
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
        <SidebarSeparator className='my-1' />
        <SidebarGroup className='pt-1'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isMenuItemActive(RECORD_RESULT_MENU_ITEM.to)}
                onClick={handleToggleMobileMenu}
              >
                <Link to={RECORD_RESULT_MENU_ITEM.to}>
                  <RecordResultIcon />
                  {RECORD_RESULT_MENU_ITEM.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <User />
      </SidebarFooter>
    </Sidebar>
  );
};
