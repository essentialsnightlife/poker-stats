/// <reference types="vite/client" />

import { routeTree } from './routeTree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof routeTree;
  }
}
