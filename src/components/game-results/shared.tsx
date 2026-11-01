import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGetLocations } from '@/lib/services/players';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';
import {
  BOUNTY_VALUE,
  formatMoney,
  GameResultPlayer,
  getGameTotals,
} from './model';

const BUY_IN_OPTIONS = Array.from({ length: 9 }, (_, index) => 10 + index * 5);
const BOUNTY_VALUE_OPTIONS = Array.from({ length: 6 }, (_, index) => index * 5);
const ADD_NEW_LOCATION = '__add-new-location__';
const CUSTOM_AMOUNT = '__custom-amount__';

export function GameDetails({
  buyInPrice = 20,
  bountyValue = BOUNTY_VALUE,
  onBuyInPriceChange,
  onBountyValueChange,
}: {
  buyInPrice?: number;
  bountyValue?: number;
  onBuyInPriceChange?: (value: number) => void;
  onBountyValueChange?: (value: number) => void;
}) {
  const [location, setLocation] = useState('');
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const { data: locationOptions = [], isLoading: isLoadingLocations } =
    useGetLocations();

  const selectLocation = (value: string) => {
    setIsAddingLocation(value === ADD_NEW_LOCATION);
    setLocation(value === ADD_NEW_LOCATION ? '' : value);
  };
  return (
    <Card className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <DateField />
      <div className='space-y-1 text-sm font-medium'>
        <label>Location</label>
        <Select value={location || undefined} onValueChange={selectLocation}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                isLoadingLocations ? 'Loading locations…' : 'Select a location'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {locationOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
            <SelectItem value={ADD_NEW_LOCATION}>
              <Plus /> Add new location…
            </SelectItem>
          </SelectContent>
        </Select>
        {isAddingLocation && (
          <Input
            autoFocus
            placeholder='Enter a new location'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        )}
      </div>
      <PresetAmountField
        label='Buy-in'
        options={BUY_IN_OPTIONS}
        value={buyInPrice}
        min={1}
        onChange={onBuyInPriceChange}
      />
      <PresetAmountField
        label='Bounty value'
        options={BOUNTY_VALUE_OPTIONS}
        value={bountyValue}
        min={0}
        onChange={onBountyValueChange}
      />
    </Card>
  );
}

function DateField() {
  const inputRef = useRef<HTMLInputElement>(null);
  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;

    try {
      input.showPicker();
    } catch {
      input.focus();
    }
  };

  return (
    <div className='space-y-1 text-sm font-medium'>
      <label htmlFor='game-date'>Date</label>
      <div className='relative'>
        <Input
          ref={inputRef}
          id='game-date'
          className='game-date-input cursor-pointer pr-10'
          type='date'
          defaultValue={dayjs().format('YYYY-MM-DD')}
          onClick={openPicker}
        />
        <button
          type='button'
          aria-label='Open date picker'
          className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex w-10 items-center justify-center'
          onClick={openPicker}
        >
          <CalendarDays className='size-4' />
        </button>
      </div>
    </div>
  );
}

export function TotalsStrip({
  players,
  buyInPrice = 20,
  bountyValue = BOUNTY_VALUE,
}: {
  players: GameResultPlayer[];
  buyInPrice?: number;
  bountyValue?: number;
}) {
  const totals = getGameTotals(players, buyInPrice);
  const items = [
    ['Players', totals.players],
    ['Rebuys', totals.rebuys],
    ['Pot', formatMoney(totals.pot)],
    ['Pot assigned', formatMoney(totals.payouts)],
    [
      `Bounties · ${formatMoney(bountyValue)} each`,
      `${totals.bounties} / ${totals.expectedBounties}`,
    ],
  ];

  return (
    <div className='bg-card grid overflow-hidden rounded-xl border sm:grid-cols-5'>
      {items.map(([label, value]) => (
        <div
          key={label}
          className='border-b p-3 last:border-0 sm:border-r sm:border-b-0'
        >
          <div className='text-muted-foreground text-xs'>{label}</div>
          <div className='font-semibold'>{value}</div>
        </div>
      ))}
    </div>
  );
}

export function StatePreview({
  players,
  settings,
}: {
  players: GameResultPlayer[];
  settings?: Record<string, number>;
}) {
  return (
    <details className='bg-muted/40 rounded-lg border p-3 text-xs'>
      <summary className='cursor-pointer font-medium'>Prototype state</summary>
      <pre className='mt-3 overflow-x-auto'>
        {JSON.stringify({ settings, players }, null, 2)}
      </pre>
    </details>
  );
}

function PresetAmountField({
  label,
  options,
  value,
  min,
  onChange,
}: {
  label: string;
  options: number[];
  value: number;
  min: number;
  onChange?: (value: number) => void;
}) {
  const [isCustom, setIsCustom] = useState(false);
  const selectAmount = (nextValue: string) => {
    const custom = nextValue === CUSTOM_AMOUNT;
    setIsCustom(custom);
    if (!custom) onChange?.(Number(nextValue));
  };

  return (
    <div className='space-y-1 text-sm font-medium'>
      <label>{label}</label>
      <Select
        value={isCustom ? CUSTOM_AMOUNT : String(value)}
        onValueChange={selectAmount}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((amount) => (
            <SelectItem key={amount} value={String(amount)}>
              £{amount}
            </SelectItem>
          ))}
          <SelectItem value={CUSTOM_AMOUNT}>Custom amount…</SelectItem>
        </SelectContent>
      </Select>
      {isCustom && (
        <Input
          autoFocus
          type='number'
          min={min}
          placeholder='Enter amount'
          value={value}
          onChange={(event) => onChange?.(Number(event.target.value))}
        />
      )}
    </div>
  );
}
