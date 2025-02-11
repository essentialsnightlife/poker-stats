import { RouterProps } from 'react-router-dom';
import { Action, Location, BrowserHistory } from 'history';

export interface IAppStore {
  action: Action;
  location: Location;

  setHistory: ({ action, location }: THistory) => void;
}

type THistory = {
  action: Action;
  location: Location;
};

export type TRouterProps = {
  history: BrowserHistory;
} & Partial<RouterProps>;
