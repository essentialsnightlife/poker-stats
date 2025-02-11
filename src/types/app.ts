import { RouterProps } from 'react-router-dom';
import { Action, Location, BrowserHistory } from 'history';

export interface IAppStore {
  theme: Theme;
  action: Action;
  location: Location;
  isSidebarOpen: boolean;

  setHistory: ({ action, location }: THistory) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

type Theme = 'light' | 'dark';

type THistory = {
  action: Action;
  location: Location;
};

export type TRouterProps = {
  history: BrowserHistory;
} & Partial<RouterProps>;
