export type TLeaderBoard = {
  rank: number;
  name: string;
  games_played: number;
  win_percentage: number;
  wins: number;
  ppg: number;
  total_points: number;
  winnings: number;
};

export type TGameStatistics = {
  total_games_played: number;
  total_spend_on_games: number;
  total_buy_ins: number;
  total_rebuys: number;
};

export type TResultSummary = {
  date: string;
  location: string;
  pic: string;
  comments: string;
  buy_in_price?: number;
  winner: string;
  second_place: string;
  third_place: string;
  last_place: string;
  total_rebuys: number;
  total_pot: number;
  number_of_players: number;
};

export type TPlayer = {
  id: number;
  name: string;
  nickname?: string;
  birthday?: string;
  stats?: number;
  img: string;
};

export type TPlayerDashboard = {
  player_id: number;
  name: string;
  total_wins: number;
  top_2_finishes: number;
  games_played: number;
  days_since_last_win: number;
  win_percentage: number;
};

export type TGameResult = {
  game_id: number;
  game_date: string;
  game_buy_in: number;
  player_id: number;
  total_players: number;
  location: string;
  finishing_position: number;
  total_spend: number;
  total_winnings: number;
  net_winnings: number;
};

export type TDetailedResult = {
  game_id: number;
  date: string;
  location: string;
  comments: string;
  number_of_players: number;
  buy_in_price: number;
  total_rebuys: number;
  total_pot: number;
  winner: string;
  second_place: string;
  third_place: string;
  last_place: string;
  pic: string;
};
