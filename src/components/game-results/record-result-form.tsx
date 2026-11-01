import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetPlayers } from '@/lib/services/players';
import { TPlayer } from '@/types/players';
import {
  CheckCircle2,
  GripVertical,
  Plus,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { formatMoney, GameResultPlayer, getGameTotals } from './model';
import { GameDetails, StatePreview, TotalsStrip } from './shared';

type NumberField = 'buyIns' | 'potWinnings' | 'bounties';
type PendingRemoval = { player: GameResultPlayer; index: number };
type PlayerName = Pick<TPlayer, 'name' | 'nickname'>;
type RecordResultFormProps = {
  initialPlayers?: GameResultPlayer[];
  showStatePreview?: boolean;
};

const EMPTY_PLAYERS: GameResultPlayer[] = [];

const getPlayerDisplayName = ({ name, nickname }: PlayerName) =>
  nickname?.trim() || name;

export function RecordResultForm({
  initialPlayers = EMPTY_PLAYERS,
  showStatePreview = false,
}: RecordResultFormProps) {
  const [players, setPlayers] = useState(() => initialPlayers);
  const [buyInPrice, setBuyInPrice] = useState(20);
  const [bountyValue, setBountyValue] = useState(10);
  const [draggedId, setDraggedId] = useState<number>();
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval>();
  const nextRowIdRef = useRef(
    Math.max(0, ...initialPlayers.map((player) => player.id)) + 1,
  );
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const totals = getGameTotals(players, buyInPrice);
  const { data: databasePlayers = [], isLoading: isLoadingPlayers } =
    useGetPlayers();
  const availablePlayers = databasePlayers.filter(
    (databasePlayer) =>
      !players.some(
        (player) =>
          player.sourcePlayerId === databasePlayer.id ||
          player.nickname.toLowerCase() ===
            databasePlayer.nickname?.toLowerCase() ||
          player.name.toLowerCase() === databasePlayer.name.toLowerCase(),
      ),
  );
  const isBalanced =
    players.length > 0 &&
    totals.payoutDifference === 0 &&
    totals.bountyDifference === 0;
  const update = (id: number, field: NumberField, value: number) =>
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, [field]: value } : player,
      ),
    );
  const addPlayer = (databasePlayer: TPlayer) => {
    setPlayers((current) => [
      {
        id: nextRowIdRef.current++,
        sourcePlayerId: databasePlayer.id,
        name: databasePlayer.name,
        nickname: getPlayerDisplayName(databasePlayer),
        buyIns: 1,
        potWinnings: 0,
        bounties: 0,
      },
      ...current,
    ]);
    setIsAddingPlayer(false);
  };
  const addNewPlayer = (displayName: string) => {
    setPlayers((current) => [
      {
        id: nextRowIdRef.current++,
        name: displayName,
        nickname: displayName,
        buyIns: 1,
        potWinnings: 0,
        bounties: 0,
      },
      ...current,
    ]);
    setIsAddingPlayer(false);
  };
  const remove = (id: number) => {
    const index = players.findIndex((player) => player.id === id);
    if (index < 0) return;

    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    setPlayers((current) => current.filter((player) => player.id !== id));
    setPendingRemoval({ player: players[index], index });
    undoTimeoutRef.current = setTimeout(() => {
      setPendingRemoval(undefined);
      undoTimeoutRef.current = undefined;
    }, 3000);
  };
  const undoRemove = () => {
    if (!pendingRemoval) return;
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    setPlayers((current) => {
      if (current.some((player) => player.id === pendingRemoval.player.id)) {
        return current;
      }
      const next = [...current];
      next.splice(
        Math.min(pendingRemoval.index, next.length),
        0,
        pendingRemoval.player,
      );
      return next;
    });
    setPendingRemoval(undefined);
    undoTimeoutRef.current = undefined;
  };
  useEffect(
    () => () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    },
    [],
  );
  const move = (id: number, step: number) =>
    setPlayers((current) => {
      const from = current.findIndex((player) => player.id === id);
      const to = Math.max(0, Math.min(current.length - 1, from + step));
      const next = [...current];
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });
  const drop = (targetId: number) =>
    setPlayers((current) => {
      if (!draggedId || draggedId === targetId) return current;
      const next = [...current];
      const from = next.findIndex((player) => player.id === draggedId);
      const to = next.findIndex((player) => player.id === targetId);
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });

  return (
    <div className='space-y-4 pb-24'>
      <GameDetails
        buyInPrice={buyInPrice}
        bountyValue={bountyValue}
        onBuyInPriceChange={setBuyInPrice}
        onBountyValueChange={setBountyValue}
      />
      <TotalsStrip
        players={players}
        buyInPrice={buyInPrice}
        bountyValue={bountyValue}
      />
      <div className='bg-card overflow-hidden rounded-xl border'>
        <div className='flex items-center justify-between border-b p-4'>
          <div>
            <h2 className='font-semibold'>Final standings</h2>
            <p className='text-muted-foreground text-sm'>
              Drag rows into finishing order, then enter money.
            </p>
          </div>
          <Button
            variant='outline'
            aria-expanded={isAddingPlayer}
            onClick={() => setIsAddingPlayer((current) => !current)}
          >
            <Plus /> Add player
          </Button>
        </div>
        {isAddingPlayer && (
          <AddPlayerPanel
            players={availablePlayers}
            playersInGame={players}
            isLoading={isLoadingPlayers}
            onAdd={addPlayer}
            onAddNew={addNewPlayer}
            onCancel={() => setIsAddingPlayer(false)}
          />
        )}
        <div className='overflow-x-auto'>
          <table className='w-full min-w-3xl text-sm'>
            <thead className='bg-muted/50 text-muted-foreground text-left text-xs'>
              <tr>
                <th className='p-3'>Place</th>
                <th>Player</th>
                <th>Buy-ins</th>
                <th>Pot payout</th>
                <th>Bounties</th>
                <th>Net</th>
                <th>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <PlayerRow
                  key={player.id}
                  player={player}
                  position={index + 1}
                  update={update}
                  remove={remove}
                  move={move}
                  onDragStart={() => setDraggedId(player.id)}
                  onDrop={() => drop(player.id)}
                  buyInPrice={buyInPrice}
                  bountyValue={bountyValue}
                />
              ))}
              {players.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className='text-muted-foreground p-8 text-center'
                  >
                    Add players to start recording the final standings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <BalanceCheck
        totals={totals}
        isBalanced={isBalanced}
        hasPlayers={players.length > 0}
      />
      {showStatePreview && (
        <StatePreview
          players={players}
          settings={{ buyInPrice, bountyValue }}
        />
      )}
      {pendingRemoval && (
        <RemovalToast pending={pendingRemoval} onUndo={undoRemove} />
      )}
    </div>
  );
}

function AddPlayerPanel({
  players,
  playersInGame,
  isLoading,
  onAdd,
  onAddNew,
  onCancel,
}: {
  players: TPlayer[];
  playersInGame: GameResultPlayer[];
  isLoading: boolean;
  onAdd: (player: TPlayer) => void;
  onAddNew: (displayName: string) => void;
  onCancel: () => void;
}) {
  const [newPlayerName, setNewPlayerName] = useState('');
  const selectPlayer = (playerId: string) => {
    const player = players.find(({ id }) => id === Number(playerId));
    if (player) onAdd(player);
  };
  const normalizedName = newPlayerName.trim().toLowerCase();
  const isDuplicate =
    normalizedName.length > 0 &&
    [...players, ...playersInGame].some(
      (player) =>
        getPlayerDisplayName(player).trim().toLowerCase() === normalizedName,
    );
  const submitNewPlayer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalizedName || isDuplicate) return;
    onAddNew(newPlayerName.trim());
  };

  return (
    <div className='bg-muted/30 grid gap-3 border-b p-4 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-end'>
      <div className='flex-1 space-y-1'>
        <label className='text-sm font-medium'>Choose a player</label>
        <Select onValueChange={selectPlayer}>
          <SelectTrigger disabled={isLoading || players.length === 0}>
            <SelectValue
              placeholder={
                isLoading
                  ? 'Loading players…'
                  : players.length === 0
                    ? 'All database players are included'
                    : 'Select from the player database'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {players.map((player) => (
              <SelectItem key={player.id} value={String(player.id)}>
                {getPlayerDisplayName(player)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className='text-muted-foreground hidden pb-2 text-xs sm:block'>
        or
      </span>
      <form className='space-y-1' onSubmit={submitNewPlayer}>
        <label htmlFor='new-player-name' className='text-sm font-medium'>
          Add someone new
        </label>
        <div className='flex gap-2'>
          <Input
            id='new-player-name'
            value={newPlayerName}
            placeholder='Player nickname'
            aria-invalid={isDuplicate}
            onChange={(event) => setNewPlayerName(event.target.value)}
          />
          <Button type='submit' disabled={!normalizedName || isDuplicate}>
            Add
          </Button>
        </div>
        {isDuplicate && (
          <p className='text-destructive text-xs'>
            This player already exists—choose them from the list.
          </p>
        )}
      </form>
      <Button
        type='button'
        variant='ghost'
        className='mb-px'
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
}

function RemovalToast({
  pending,
  onUndo,
}: {
  pending: PendingRemoval;
  onUndo: () => void;
}) {
  return (
    <div
      role='status'
      aria-live='polite'
      className='bg-foreground text-background fixed top-16 right-4 z-50 flex w-[min(22rem,calc(100vw-2rem))] items-center gap-3 rounded-xl p-4 shadow-2xl'
    >
      <div className='min-w-0 flex-1'>
        <p className='font-medium'>
          {getPlayerDisplayName(pending.player)} removed
        </p>
        <p className='text-sm opacity-70'>Undo available for 3 seconds</p>
      </div>
      <Button size='sm' variant='secondary' onClick={onUndo}>
        Undo
      </Button>
    </div>
  );
}

function PlayerRow({
  player,
  position,
  update,
  remove,
  move,
  onDragStart,
  onDrop,
  buyInPrice,
  bountyValue,
}: {
  player: GameResultPlayer;
  position: number;
  update: (id: number, field: NumberField, value: number) => void;
  remove: (id: number) => void;
  move: (id: number, step: number) => void;
  onDragStart: () => void;
  onDrop: () => void;
  buyInPrice: number;
  bountyValue: number;
}) {
  const displayName = getPlayerDisplayName(player);
  const net =
    player.potWinnings -
    player.buyIns * buyInPrice +
    player.bounties * bountyValue;
  return (
    <tr
      draggable
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      className='hover:bg-muted/30 border-b last:border-0'
    >
      <td className='p-3'>
        <div className='flex items-center gap-2'>
          <GripVertical
            className='text-muted-foreground cursor-grab'
            size={17}
          />
          <span className='bg-muted flex size-7 items-center justify-center rounded-full font-semibold'>
            {position}
          </span>
          <span className='sr-only'>
            <button onClick={() => move(player.id, -1)}>Move up</button>
            <button onClick={() => move(player.id, 1)}>Move down</button>
          </span>
        </div>
      </td>
      <td>
        <div className='font-medium'>{displayName}</div>
      </td>
      <td>
        <Input
          className='w-20'
          type='number'
          min='1'
          value={player.buyIns}
          onChange={(event) =>
            update(player.id, 'buyIns', Number(event.target.value))
          }
        />
      </td>
      <td>
        <Input
          className='w-24'
          type='number'
          min='0'
          step='5'
          value={player.potWinnings}
          onChange={(event) =>
            update(player.id, 'potWinnings', Number(event.target.value))
          }
        />
      </td>
      <td>
        <Input
          className='w-20'
          type='number'
          min='0'
          value={player.bounties}
          onChange={(event) =>
            update(player.id, 'bounties', Number(event.target.value))
          }
        />
      </td>
      <td
        className={`font-semibold ${net >= 0 ? 'text-success' : 'text-destructive'}`}
      >
        {net >= 0 ? '+' : '−'}
        {formatMoney(Math.abs(net))}
      </td>
      <td className='pr-3 text-right'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='text-muted-foreground hover:text-destructive'
          aria-label={`Remove ${displayName} from standings`}
          title={`Remove ${displayName}`}
          onClick={() => remove(player.id)}
        >
          <Trash2 />
        </Button>
      </td>
    </tr>
  );
}

type GameTotals = ReturnType<typeof getGameTotals>;

function BalanceCheck({
  totals,
  isBalanced,
  hasPlayers,
}: {
  totals: GameTotals;
  isBalanced: boolean;
  hasPlayers: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center ${isBalanced ? 'border-success/30 bg-success/10' : 'border-amber-500/30 bg-amber-500/10'}`}
    >
      {isBalanced ? (
        <CheckCircle2 className='text-success shrink-0' />
      ) : (
        <TriangleAlert className='shrink-0 text-amber-600' />
      )}
      <div className='flex-1'>
        <p className='font-medium'>
          {!hasPlayers
            ? 'Add players to continue'
            : isBalanced
              ? 'Everything balances'
              : 'Check the game totals'}
        </p>
        <div className='mt-2 grid gap-1 text-sm sm:grid-cols-2'>
          <BalanceItem
            isValid={totals.payoutDifference === 0}
            label='Pot payouts'
            value={`${formatMoney(totals.payouts)} / ${formatMoney(totals.pot)}`}
          />
          <BalanceItem
            isValid={totals.bountyDifference === 0}
            label='Bounties claimed'
            value={`${totals.bounties} / ${totals.expectedBounties}`}
          />
        </div>
        <p className='text-muted-foreground mt-2 text-xs'>
          Expected bounties equal total buy-ins minus the final surviving entry.
        </p>
      </div>
      <Button disabled={!isBalanced}>Save game</Button>
    </div>
  );
}

function BalanceItem({
  isValid,
  label,
  value,
}: {
  isValid: boolean;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-center gap-2'>
      {isValid ? (
        <CheckCircle2 className='text-success size-4' />
      ) : (
        <TriangleAlert className='size-4 text-amber-600' />
      )}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
