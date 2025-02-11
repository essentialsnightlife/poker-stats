import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trophy, Users, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
  {
    title: 'Current Ranking',
    value: '#3',
    icon: Trophy,
    description: 'Top 1% of players',
  },
  {
    title: 'Total Winnings',
    value: '$12,345',
    icon: DollarSign,
    description: '+15% from last month',
  },
  {
    title: 'Win Percentage',
    value: '68%',
    icon: TrendingUp,
    description: '180 games played',
  },
  {
    title: 'Average Points',
    value: '89',
    icon: Users,
    description: 'Per game',
  },
];

const leaderboardData = [
  {
    rank: 1,
    name: 'Alice Smith',
    gamesPlayed: 200,
    winPercentage: 72,
    ppg: 95,
    winnings: 15000,
  },
  {
    rank: 2,
    name: 'Bob Johnson',
    gamesPlayed: 180,
    winPercentage: 70,
    ppg: 92,
    winnings: 14000,
  },
  {
    rank: 3,
    name: 'Charlie Brown',
    gamesPlayed: 220,
    winPercentage: 68,
    ppg: 90,
    winnings: 13500,
  },
  {
    rank: 4,
    name: 'David Lee',
    gamesPlayed: 190,
    winPercentage: 65,
    ppg: 88,
    winnings: 12000,
  },
  {
    rank: 5,
    name: 'Eva Garcia',
    gamesPlayed: 210,
    winPercentage: 63,
    ppg: 87,
    winnings: 11500,
  },
];

const recentGames = [
  { id: 1, date: '2023-05-15', result: 'Win', points: 95, winnings: 500 },
  { id: 2, date: '2023-05-12', result: 'Loss', points: 82, winnings: -200 },
  { id: 3, date: '2023-05-10', result: 'Win', points: 88, winnings: 350 },
  { id: 4, date: '2023-05-08', result: 'Win', points: 91, winnings: 400 },
];

export function Home() {
  return (
    <div className='space-y-6'>
      <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {stat.title}
              </CardTitle>
              <stat.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stat.value}</div>
              <p className='text-muted-foreground text-xs'>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Leaderboard</CardTitle>
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Sort by' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='wins'>Wins</SelectItem>
                  <SelectItem value='ppg'>PPG</SelectItem>
                  <SelectItem value='earnings'>Earnings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Games Played</TableHead>
                  <TableHead>Win %</TableHead>
                  <TableHead>PPG</TableHead>
                  <TableHead>Winnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell>{player.rank}</TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.gamesPlayed}</TableCell>
                    <TableCell>{player.winPercentage}%</TableCell>
                    <TableCell>{player.ppg}</TableCell>
                    <TableCell>${player.winnings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Winnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGames.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>{game.date}</TableCell>
                    <TableCell>{game.result}</TableCell>
                    <TableCell>{game.points}</TableCell>
                    <TableCell>${game.winnings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
