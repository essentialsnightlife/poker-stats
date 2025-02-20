import { QueryClient } from '@tanstack/react-query';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { cache } from 'react';
import { twMerge } from 'tailwind-merge';
import { StoreApi, UseBoundStore } from 'zustand';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryClient = cache(() => new QueryClient());

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  stores: S,
) => {
  const store = stores as WithSelectors<typeof stores>;

  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const dateFormatter = (dateString: string, format?: string) =>
  dayjs(dateString).format(format || 'MMM D, YYYY');

export const priceFormatter = (amount: number, currency = 'GBP') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const getRoute = (...routes: Array<string | number>) => {
  let route = '';

  for (let i = 0; i < routes.length; i++) {
    if (String(routes[i]).startsWith('/')) {
      route += routes[i];
    } else if (String(routes[i]).startsWith('?')) {
      route += routes[i];
    } else {
      route += `/${routes[i]}`;
    }
  }

  return route;
};
