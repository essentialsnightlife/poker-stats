import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Layout } from '@/components/layout';
import { Suspense } from 'react';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const TanStackReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools position='bottom-left' />
        <TanStackReactQueryDevtools />
      </Suspense>
    </Layout>
  ),
});
