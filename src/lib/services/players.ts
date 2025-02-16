import {
  TDetailedResult,
  TGameResult,
  TLeaderBoard,
  TPlayer,
  TResultSummary,
} from '@/types/players';
import { supabase } from './api';
import { useQuery } from '@tanstack/react-query';
import { Endpoints } from './endpoints';

const getLeaderboard = async (): Promise<TLeaderBoard[]> =>
  (await supabase.from(Endpoints.GetLeaderBoard).select().throwOnError()).data;

export const useGetLeaderboard = () =>
  useQuery({
    queryKey: [Endpoints.GetLeaderBoard],
    queryFn: getLeaderboard,
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
const getPlayerStats = async (id: number): Promise<TPlayer> =>
  (
    await supabase
      .from(Endpoints.GetPlayers)
      .select()
      .eq('id', id)
      .single()
      .throwOnError()
  ).data;

export const useGetPlayerStats = (id: number) =>
  useQuery({
    queryKey: [Endpoints.GetPlayers, id],
    queryFn: () => getPlayerStats(id),
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

// Games > Get Detailed Results
const getDetailedResults = async (gameId: number): Promise<TDetailedResult> =>
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
