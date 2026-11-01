import { useState } from 'react';
import { INITIAL_PLAYERS } from '@/components/game-results/model';
import { RecordResultForm } from '@/components/game-results/record-result-form';
import { GuidedSections } from './guided-sections';
import { PodiumBoard } from './podium-board';
import { PrototypeSwitcher, PrototypeVariant } from './prototype-switcher';

function getInitialVariant(): PrototypeVariant {
  const variant = new URLSearchParams(window.location.search).get('variant');
  return variant === 'B' || variant === 'C' ? variant : 'A';
}

export function GameResultsPrototype() {
  const [variant, setVariant] = useState<PrototypeVariant>(getInitialVariant);
  const changeVariant = (next: PrototypeVariant) => {
    const params = new URLSearchParams(window.location.search);
    params.set('variant', next);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`,
    );
    setVariant(next);
  };

  return (
    <>
      <div className='mb-5'>
        <p className='text-primary text-sm font-medium'>Throwaway prototype</p>
        <h1 className='text-2xl font-bold'>Record a game</h1>
        <p className='text-muted-foreground text-sm'>
          Three one-page approaches, switchable with the bar below or the
          left/right arrow keys.
        </p>
      </div>
      {variant === 'A' && (
        <RecordResultForm initialPlayers={INITIAL_PLAYERS} showStatePreview />
      )}
      {variant === 'B' && <PodiumBoard />}
      {variant === 'C' && <GuidedSections />}
      {import.meta.env.DEV && (
        <PrototypeSwitcher current={variant} onChange={changeVariant} />
      )}
    </>
  );
}
