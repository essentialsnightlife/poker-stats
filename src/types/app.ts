export interface IAppStore {
  theme: Theme;
  sidebarState: SidebarState;
  isMobile: boolean;
  openMobile: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarState: (state: SidebarState) => void;
  setOpenMobile: (open: boolean) => void;
}

type Theme = 'light' | 'dark';
type SidebarState = 'expanded' | 'collapsed';
