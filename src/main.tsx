import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { Tanstack as TanstackProvider } from '@/components/providers/tanstack';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <TanstackProvider>
    <RouterProvider router={router} />
  </TanstackProvider>,
);
