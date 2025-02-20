import { TanstackProvider } from '@/components/providers';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';

const router = createRouter({ routeTree });

export const App = () => (
  <>
    <TanstackProvider>
      <RouterProvider router={router} />
    </TanstackProvider>
  </>
);
