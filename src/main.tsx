import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools'; // ✅ Import DevTools

import { routeTree } from './routeTree.gen';
import { Tanstack as TanstackProvider } from '@/components/providers/tanstack';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <TanstackProvider>
    <RouterProvider router={router} />
    <TanStackRouterDevtools router={router} position='bottom-right' />
  </TanstackProvider>,
);
