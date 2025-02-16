import { useRoutes } from 'react-router-dom';
import { Board, Home } from '@/pages';
import { Layout } from '@/components/layout';
import { Test } from '@/pages/test';

export const Router = () => {
  return useRoutes([
    {
      element: <Layout />,
      children: [
        {
          path: '*',
          element: <Home />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/board',
          element: <Board />,
        },
        {
          path: '/test',
          element: <Test />,
        },
      ],
    },
  ]);
};
