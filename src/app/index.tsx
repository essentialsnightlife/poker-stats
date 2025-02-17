import { TanstackProvider } from './providers';
import { Router } from '@/router';

export const App = () => {
  return (
    <TanstackProvider>
      <Router />
    </TanstackProvider>
  );
};
