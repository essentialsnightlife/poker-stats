import { create } from 'zustand';
import { createSelectors } from '../utils';
import type { IAppStore } from '@/types/app';
import { history } from '@/lib/utils';

const useAppBase = create<IAppStore>((set) => ({
  theme: (localStorage.getItem('theme') ?? 'light') as IAppStore['theme'],
  action: history.action,
  location: history.location,
  isSidebarOpen: false,
  setHistory: ({ action, location }) => set(() => ({ action, location })),
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light';

      return { theme };
    }),
  toggleSidebar: () =>
    set((state) => {
      const isSidebarOpen = !state.isSidebarOpen;
      return { isSidebarOpen };
    }),
}));

export const useAppStore = createSelectors(useAppBase);
