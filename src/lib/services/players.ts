import {
  TDetailedResult,
  TGameResult,
  TGameStatistics,
  TLeaderBoard,
  TPlayer,
  TPlayerDashboard,
  TRankingResults,
  TResultSummary,
} from '@/types/players';
import { supabase } from './api';
import { useQueries } from '@tanstack/react-query';
import { Endpoints } from './endpoints';

const getLeaderboard = async (
  seasonYear?: number,
): Promise<TLeaderBoard[]> => {
  if (!seasonYear) {
    return (await supabase.from(Endpoints.GetLeaderBoard).select().throwOnError())
      .data;
  }

  return (
    await supabase
      .from(Endpoints.GetLeaderBoardBySeason)
      .select()
      .eq('season_year', seasonYear)
      .throwOnError()
  ).data;
};

export const useGetLeaderboard = (seasonYear?: number) =>
  useQuery({
    queryKey: [Endpoints.GetLeaderBoard, seasonYear ?? 'all'],
    queryFn: () => getLeaderboard(seasonYear),
  });

const getGameStatistics = async (
  seasonYear?: number,
): Promise<TGameStatistics> => {
  if (!seasonYear) {
    return (
      await supabase
        .from(Endpoints.GetGameStatistics)
        .select()
        .throwOnError()
        .single()
    ).data;
  }

  return (
    await supabase
      .from(Endpoints.GetGameStatisticsBySeason)
      .select()
      .eq('season_year', seasonYear)
      .throwOnError()
      .single()
  ).data;
};

export const useGetGameStatistics = (seasonYear?: number) =>
  useQuery({
    queryKey: [Endpoints.GetGameStatistics, seasonYear ?? 'all'],
    queryFn: () => getGameStatistics(seasonYear),
  });

// Home Page > Recent Games
// Games > Games Overview
const getRecentResultsSummary = async (
  limit?: number,
): Promise<TResultSummary[]> => {
  let query = supabase.from(Endpoints.GetResultsSummary).select();

  if (limit) {
    query = query.limit(limit);
  }

  return (await query.throwOnError()).data;
};

export const useGetRecentResultsSummary = (limit?: number) =>
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

const getGameRankings = async (gameId: number): Promise<TRankingResults[]> =>
  (
    await supabase
      .from(Endpoints.GetResultRankings)
      .select()
      .eq('game_id', gameId)
      .throwOnError()
  ).data;

export const useGetGameRankings = (gameId: number) =>
  useQuery({
    queryKey: [Endpoints.GetResultRankings, gameId],
    queryFn: () => getGameRankings(gameId),
  });
