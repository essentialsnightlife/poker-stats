import {
  TDetailedResult,
  TGameResult,
  TGameStatistics,
  TLeaderBoard,
  TPlayer,
  TPlayerDashboard,
  TResultSummary,
} from '@/types/players';
import { supabase } from './api';
import { useQueries } from '@tanstack/react-query';
import { Endpoints } from './endpoints';

const getLeaderboard = async (): Promise<TLeaderBoard[]> =>
  (await supabase.from(Endpoints.GetLeaderBoard).select().throwOnError()).data;

export const useGetLeaderboard = () =>
  useQuery({
    queryKey: [Endpoints.GetLeaderBoard],
    queryFn: getLeaderboard,
  });

const getGameStatistics = async (): Promise<TGameStatistics> =>
  (
    await supabase
      .from(Endpoints.GetGameStatistics)
      .select()
      .throwOnError()
      .single()
  ).data;

export const useGetGameStatistics = () =>
  useQuery({
    queryKey: [Endpoints.GetGameStatistics],
    queryFn: getGameStatistics,
  });

// Home Page > Recent Games
// Games > Games Overview
const getRecentResultsSummary = async (
  limit: number = 5,
): Promise<TResultSummary[]> =>
  (
    await supabase
      .from(Endpoints.GetResultsSummary)
      .select()
      .limit(limit)
      .throwOnError()
  ).data;

export const useGetRecentResultsSummary = (limit: number) =>
  useQuery({
    queryKey: [Endpoints.GetResultsSummary, limit],
    queryFn: () => getRecentResultsSummary(limit),
  });

// Players > Choose Player > Drop Down menu
const getPlayers = async (): Promise<TPlayer[]> =>
  (await supabase.from(Endpoints.GetPlayers).select().throwOnError()).data;

export const useGetPlayers = () =>
  useQuery({
    queryKey: [Endpoints.GetPlayers],
    queryFn: getPlayers,
  });

// Players > Get Player Stats / Dashboard
const getPlayerStats = async (playerId: number): Promise<TPlayer> =>
  (
    await supabase
      .from(Endpoints.GetPlayers)
      .select()
      .eq('id', playerId)
      .single()
      .throwOnError()
  ).data;

export const useGetPlayerStats = (playerId: number) =>
  useQuery({
    queryKey: [Endpoints.GetPlayers, playerId],
    queryFn: () => getPlayerStats(playerId),
  });

const getPlayerDashboard = async (
  playerId: number,
): Promise<TPlayerDashboard> =>
  (
    await supabase
      .from(Endpoints.GetPlayerDashboard)
      .select()
      .eq('player_id', playerId)
      .single()
      .throwOnError()
  ).data;

export const useGetPlayerDashboard = (playerId: number) =>
  useQuery({
    queryKey: [Endpoints.GetPlayerDashboard, playerId],
    queryFn: () => getPlayerDashboard(playerId),
  });

// Players > Get Player Stats / Dashboard
const getPlayerGameResults = async (playerId: number): Promise<TGameResult[]> =>
  (
    await supabase
      .from(Endpoints.GetPlayerGameResults)
      .select()
      .eq('player_id', playerId)
      .throwOnError()
  ).data;

export const useGetPlayerGameResults = (playerId: number) =>
  useQuery({
    queryKey: [Endpoints.GetPlayerGameResults, playerId],
    queryFn: () => getPlayerGameResults(playerId),
  });

export const useGetPlayerData = (playerId: number) => {
  const results = useQueries({
    queries: [
      {
        queryKey: [Endpoints.GetPlayers, playerId],
        queryFn: () => getPlayerStats(playerId),
      },
      {
        queryKey: [Endpoints.GetPlayerDashboard, playerId],
        queryFn: () => getPlayerDashboard(playerId),
      },
      {
        queryKey: [Endpoints.GetPlayerGameResults, playerId],
        queryFn: () => getPlayerGameResults(playerId),
      },
    ],
  });

  return {
    player: results[0].data,
    dashboard: results[1].data,
    gameResults: results[2].data,
    isLoading: results.some((query) => query.isLoading),
  };
};

export const getDetailedResults = async (
  gameId: number,
): Promise<TDetailedResult> =>
  (
    await supabase
      .from(Endpoints.GetDetailedResults)
      .select()
      .eq('game_id', gameId)
      .single()
      .throwOnError()
  ).data;

export const useGetDetailedResults = (gameId: number) =>
  useQuery({
    queryKey: [Endpoints.GetDetailedResults, gameId],
    queryFn: () => getDetailedResults(gameId),
  });
