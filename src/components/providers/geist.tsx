import { GeistProvider, CssBaseline } from '@geist-ui/core';
import { FC, PropsWithChildren } from 'react';

export const Geist: FC<PropsWithChildren> = ({ children }) => (
  <GeistProvider>
    <CssBaseline />
    {children}
  </GeistProvider>
);
