import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export const PROTOTYPE_VARIANTS = [
  { key: 'A', name: 'Sortable ledger' },
  { key: 'B', name: 'Podium board' },
  { key: 'C', name: 'Guided sections' },
] as const;

export type PrototypeVariant = (typeof PROTOTYPE_VARIANTS)[number]['key'];

export function PrototypeSwitcher({
  current,
  onChange,
}: {
  current: PrototypeVariant;
  onChange: (variant: PrototypeVariant) => void;
}) {
  const index = PROTOTYPE_VARIANTS.findIndex(({ key }) => key === current);
  const cycle = (step: number) => {
    const next =
      (index + step + PROTOTYPE_VARIANTS.length) % PROTOTYPE_VARIANTS.length;
    onChange(PROTOTYPE_VARIANTS[next].key);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
        target.isContentEditable
      )
        return;
      if (event.key === 'ArrowLeft') cycle(-1);
      if (event.key === 'ArrowRight') cycle(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className='bg-foreground text-background fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full p-2 shadow-2xl'>
      <Button
        aria-label='Previous variant'
        size='icon'
        variant='ghost'
        onClick={() => cycle(-1)}
      >
        <ArrowLeft />
      </Button>
      <span className='min-w-40 text-center text-sm font-semibold'>
        {current} — {PROTOTYPE_VARIANTS[index].name}
      </span>
      <Button
        aria-label='Next variant'
        size='icon'
        variant='ghost'
        onClick={() => cycle(1)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
