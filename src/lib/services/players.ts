import { TPlayer } from '@/types/players';
import { supabase } from './api';
import { useQuery } from '@tanstack/react-query';

const getPlayers = async (): Promise<TPlayer[]> => {
  const { data } = await supabase.from('players').select();

  return data as TPlayer[];
};

export const useGetPlayers = () =>
  useQuery({
    queryKey: ['players'],
    queryFn: getPlayers,
  });
