import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { useState } from 'react';
import { INITIAL_PLAYERS } from './model';
import { GameDetails, StatePreview, TotalsStrip } from './shared';

const STEPS = [
  'Game details',
  'Players & buy-ins',
  'Finishing order',
  'Payouts',
  'Review',
];

export function GuidedSections() {
  const [step, setStep] = useState(2);
  const players = INITIAL_PLAYERS;

  return (
    <div className='space-y-4 pb-24'>
      <div className='grid gap-4 lg:grid-cols-[14rem_1fr]'>
        <Card className='h-fit space-y-1'>
          {STEPS.map((label, index) => (
            <button
              key={label}
              onClick={() => setStep(index)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm ${step === index ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              {index < step ? <Check size={16} /> : <Circle size={16} />}
              <span className='flex-1'>{label}</span>
              {step === index && <ChevronRight size={16} />}
            </button>
          ))}
        </Card>
        <div className='space-y-4'>
          {step === 0 && <GameDetails />}
          {step === 1 && <PlayerStep />}
          {step === 2 && <OrderStep />}
          {step === 3 && <PayoutStep />}
          {step === 4 && (
            <>
              <TotalsStrip players={players} />
              <StatePreview players={players} />
            </>
          )}
          <div className='flex justify-between'>
            <Button
              variant='outline'
              disabled={step === 0}
              onClick={() => setStep((current) => current - 1)}
            >
              Back
            </Button>
            <Button
              disabled={step === STEPS.length - 1}
              onClick={() => setStep((current) => current + 1)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerStep() {
  return (
    <Card>
      <h2 className='font-semibold'>Players & buy-ins</h2>
      <p className='text-muted-foreground mt-2 text-sm'>
        Select attendees, then record total entries for each player.
      </p>
      <div className='mt-4 grid gap-2 sm:grid-cols-2'>
        {INITIAL_PLAYERS.map((player) => (
          <div key={player.id} className='rounded-lg border p-3'>
            <b>{player.nickname}</b>
            <span className='float-right'>{player.buyIns} buy-ins</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OrderStep() {
  return (
    <Card>
      <h2 className='font-semibold'>Finishing order</h2>
      <p className='text-muted-foreground mt-2 text-sm'>
        Drag players into order. Payouts come next.
      </p>
      <div className='mt-4 space-y-2'>
        {INITIAL_PLAYERS.map((player, index) => (
          <div
            key={player.id}
            className='flex items-center gap-3 rounded-lg border p-3'
          >
            <span className='font-bold'>{index + 1}</span>
            <span>{player.nickname}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PayoutStep() {
  return (
    <Card>
      <h2 className='font-semibold'>Payouts</h2>
      <p className='text-muted-foreground mt-2 text-sm'>
        Record pot winnings and bounty count for each player.
      </p>
      <TotalsStrip players={INITIAL_PLAYERS} />
    </Card>
  );
}
