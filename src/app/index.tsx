import { HistoryRouterProvider, TanstackProvider } from './providers';

import { history } from '@/lib/utils';
import { Router } from '@/router';

export const App = () => {
  return (
    <HistoryRouterProvider history={history}>
      <TanstackProvider>
        <Router />
      </TanstackProvider>
    </HistoryRouterProvider>
  );
};
