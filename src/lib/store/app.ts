import { create } from 'zustand';

import { createSelectors } from '../utils';

import type { IAppStore } from '@/types/app';
import { history } from '@/lib/utils';

const useAppBase = create<IAppStore>()((set) => ({
  action: history.action,
  location: history.location,
  setHistory: ({ action, location }) => set(() => ({ action, location })),
}));

export const useAppStore = createSelectors(useAppBase);
