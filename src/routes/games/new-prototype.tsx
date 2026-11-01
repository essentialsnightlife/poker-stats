import { GameResultsPrototype } from '@/components/game-results-prototype';

// Three variants of game-result entry, switchable via ?variant=, inside the existing app shell.
export const Route = createFileRoute('/games/new-prototype')({
  component: GameResultsPrototype,
});
