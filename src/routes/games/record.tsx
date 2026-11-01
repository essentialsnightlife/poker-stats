import { RecordResult } from '@/components/game-results';
import { ROUTES } from '@/lib/constants';

export const Route = createFileRoute(ROUTES.recordResult)({
  component: RecordResult,
});
