import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { SortingState } from '@tanstack/react-table';
import { useGetLeaderboard } from '@/lib/services/players';
import { columns } from './columns';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Empty } from '../empty';
import { Loader } from '../loader';
import { Button } from '@/components/ui/button.tsx';
import { onShareButtonClick } from '@/lib/utils.ts';

export type LeaderBoardSeason = 'all' | number;

const STARTING_SEASON_YEAR = 2025;
const SEASON_YEAR_OFFSET = 2020;

function onButtonClick() {
  onShareButtonClick();
}

const getSeasonOptions = () => {
  const currentYear = new Date().getFullYear();

  return Array.from(
    { length: Math.max(currentYear - STARTING_SEASON_YEAR + 1, 1) },
    (_, index) => currentYear - index,
  );
};

export const LeaderBoard = ({
  selectedSeason = 'all',
  onSeasonChange,
  showControls = true,
}: {
  selectedSeason?: LeaderBoardSeason;
  onSeasonChange?: (season: LeaderBoardSeason) => void;
  showControls?: boolean;
}) => {
  const seasonOptions = useMemo(() => getSeasonOptions(), []);
  const seasonYear =
    typeof selectedSeason === 'number' ? selectedSeason : undefined;
  const { data, isLoading } = useGetLeaderboard(seasonYear);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'winnings', desc: true },
    { id: 'points', desc: true },
  ]);

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    initialState: {
      sorting: [
        { id: 'winnings', desc: true },
        { id: 'total_points', desc: true },
      ],
    },
  });

  return (
    <Card>
      <CardHeader className='flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <CardTitle>Leaderboard</CardTitle>
        {showControls ? (
          <Button onClick={onButtonClick} size='sm'>
            Share Leaderboard
          </Button>
        ) : null}
      </CardHeader>
      {showControls ? (
        <div className='mb-4 flex flex-col gap-2 sm:max-w-56'>
          <Select
            value={String(selectedSeason)}
            onValueChange={(value) =>
              onSeasonChange?.(value === 'all' ? 'all' : Number(value))
            }
          >
            <SelectTrigger aria-label='Filter leaderboard by season'>
              <SelectValue placeholder='All seasons' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {seasonOptions.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  Season {year - SEASON_YEAR_OFFSET} ({year})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
      <Table>
        <TableHeader>
          <TableRow>
            {table.getFlatHeaders().map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <Loader columns={columns} length={6} />
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <Empty />
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
