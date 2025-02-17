import { create } from 'zustand';
import { createSelectors } from '../utils';
import type { IAppStore } from '@/types/app';

const SIDEBAR_STORAGE_KEY = 'sidebar_state';

const useAppBase = create<IAppStore>((set) => ({
  theme: (localStorage.getItem('theme') ?? 'light') as IAppStore['theme'],
  sidebarState: (localStorage.getItem(SIDEBAR_STORAGE_KEY) ??
    'expanded') as IAppStore['sidebarState'],
  isMobile: false,
  openMobile: false,

  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      return { theme };
    }),

  toggleSidebar: () =>
    set((state) => {
      const newState =
        state.sidebarState === 'expanded' ? 'collapsed' : 'expanded';
      localStorage.setItem(SIDEBAR_STORAGE_KEY, newState);
      return { sidebarState: newState };
    }),

  setSidebarState: (sidebarState) =>
    set(() => {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarState);
      return { sidebarState };
    }),

  setOpenMobile: (openMobile) => set({ openMobile }),
}));

export const useAppStore = createSelectors(useAppBase);
