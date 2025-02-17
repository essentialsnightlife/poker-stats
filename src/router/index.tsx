// import { useRoutes } from 'react-router-dom';
// import { Games, Home, Players, PlayerDetails } from '@/pages';
// import { Layout } from '@/components/layout/test';
// import { Test } from '@/pages/test';

// export const Router = () => {
//   return useRoutes([
//     {
//       element: <Layout />,
//       children: [
//         {
//           path: '*',
//           element: <Home />,
//         },
//         {
//           path: '/',
//           element: <Home />,
//         },
//         {
//           path: '/players',
//           children: [
//             {
//               index: true,
//               element: <Players />,
//             },
//             {
//               path: ':id',
//               element: <PlayerDetails />,
//             },
//           ],
//         },
//         {
//           path: '/games',
//           element: <Games />,
//         },
//         {
//           path: '/test',
//           element: <Test />,
//         },
//       ],
//     },
//   ]);
// };

import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { Games, Home, Players, PlayerDetails } from '@/pages';
import { Layout } from '@/components/layout/test';
import { Test } from '@/pages/test';

// ✅ Root route (Like Layout in React Router)
const rootRoute = createRootRoute({
  component: Layout,
});

// ✅ Define all routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: Games,
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/players',
  component: Players,
});

const playerDetailsRoute = createRoute({
  getParentRoute: () => playersRoute,
  path: '$id', // ✅ Dynamic segment like /players/:id
  component: PlayerDetails,
});

const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/test',
  component: Test,
});

// ✅ Create the route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  gamesRoute,
  playersRoute.addChildren([playerDetailsRoute]), // ✅ Nested dynamic route
  testRoute,
]);

// ✅ Create the router
const router = createRouter({ routeTree });

// ✅ TanStack Router Provider
export const Router = () => {
  return <RouterProvider router={router} />;
};
