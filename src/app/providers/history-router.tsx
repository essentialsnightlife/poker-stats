import { Router } from 'react-router-dom';

import { useAppStore } from '@/lib/store/app';
import type { TRouterProps } from '@/types/app';

export const HistoryRouter = ({ history, ...props }: TRouterProps) => {
  const { action, location, setHistory } = useAppStore();

  useLayoutEffect(() => history.listen(setHistory), [history, setHistory]);

  return (
    <Router
      {...props}
      location={location}
      navigationType={action}
      navigator={history}
    />
  );
};
