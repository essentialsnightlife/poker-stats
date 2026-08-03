create or replace view public.game_statistics_by_season as
select
  extract(year from date::date)::integer as season_year,
  (extract(year from date::date)::integer - 2020) as season_number,
  count(*)::integer as total_games_played,
  coalesce(sum(total_pot), 0)::double precision as total_spend_on_games,
  coalesce(sum(number_of_players + total_rebuys), 0)::integer as total_buy_ins,
  coalesce(sum(total_rebuys), 0)::integer as total_rebuys
from public.results_summary
where date is not null
group by extract(year from date::date)::integer;

grant select on public.game_statistics_by_season to anon, authenticated;
