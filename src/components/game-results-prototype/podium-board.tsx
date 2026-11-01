import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { GripVertical, Plus, Trophy } from 'lucide-react';
import { formatMoney, getGameTotals, INITIAL_PLAYERS } from './model';
import { GameDetails, StatePreview, TotalsStrip } from './shared';

export function PodiumBoard() {
  const players = INITIAL_PLAYERS;
  const totals = getGameTotals(players);

  return (
    <div className='space-y-4 pb-24'>
      <GameDetails />
      <div className='grid gap-4 lg:grid-cols-[1fr_18rem]'>
        <Card className='space-y-3'>
          <div className='flex items-start justify-between'>
            <div>
              <h2 className='font-semibold'>Place the finishers</h2>
              <p className='text-muted-foreground text-sm'>
                A visual board optimised for recording the result as players go
                out.
              </p>
            </div>
            <Button variant='outline'>
              <Plus /> Player
            </Button>
          </div>
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`grid items-center gap-3 rounded-lg border p-3 sm:grid-cols-[3rem_1fr_6rem_6rem] ${index < 3 ? 'bg-primary/5' : ''}`}
            >
              <div className='flex items-center gap-2 font-bold'>
                <GripVertical size={16} className='text-muted-foreground' />
                {index + 1}
              </div>
              <div className='flex items-center gap-3'>
                {index < 3 && (
                  <Trophy
                    size={18}
                    className={
                      index === 0 ? 'text-yellow-500' : 'text-muted-foreground'
                    }
                  />
                )}
                <div>
                  <div className='font-medium'>{player.nickname}</div>
                  <div className='text-muted-foreground text-xs'>
                    {player.buyIns} buy-in{player.buyIns === 1 ? '' : 's'}
                  </div>
                </div>
              </div>
              <label className='text-muted-foreground text-xs'>
                Payout
                <Input className='mt-1' value={player.potWinnings} readOnly />
              </label>
              <label className='text-muted-foreground text-xs'>
                Bounties
                <Input className='mt-1' value={player.bounties} readOnly />
              </label>
            </div>
          ))}
        </Card>
        <div className='space-y-4 lg:sticky lg:top-4 lg:self-start'>
          <TotalsStrip players={players} />
          <Card>
            <h3 className='font-semibold'>Ready to save</h3>
            <p className='text-muted-foreground mt-1 text-sm'>
              Pot payouts equal {formatMoney(totals.payouts)}. All six finishing
              positions are filled.
            </p>
            <Button className='mt-4 w-full'>Save game</Button>
          </Card>
        </div>
      </div>
      <StatePreview players={players} />
    </div>
  );
}
