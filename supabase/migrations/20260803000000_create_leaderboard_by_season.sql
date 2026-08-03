create or replace view public.leaderboard_by_season as
with player_results as (
  select
    extract(year from rs.date::date)::integer as season_year,
    pr.player_name as name,
    pr.player_nickname as nickname,
    pr.finishing_position,
    coalesce(pr.no_of_buy_ins, 0) as no_of_buy_ins,
    coalesce(pr.total_winnings, 0) as total_winnings,
    coalesce(pr.bounties_won, 0) as bounties_won
  from public.poker_results_rankings pr
  join public.results_summary rs on rs.id = pr.game_id
  where rs.date is not null
),
aggregated as (
  select
    season_year,
    season_year - 2020 as season_number,
    max(name) as name,
    nickname,
    count(*)::integer as games_played,
    sum(no_of_buy_ins)::integer as total_buy_ins,
    sum(case when finishing_position = 1 then 1 else 0 end)::integer as wins,
    sum(
      case
        when finishing_position = 1 then 3
        when finishing_position = 2 then 2
        when finishing_position = 3 then 1
        else 0
      end
    )::integer as total_points,
    sum(total_winnings)::numeric as winnings,
    (sum(bounties_won) * 10)::numeric as sum_bounties_won,
    sum(bounties_won)::integer as total_bounties_count
  from player_results
  group by season_year, nickname
)
select
  row_number() over (
    partition by season_year
    order by winnings desc, total_points desc, wins desc, games_played asc, nickname asc
  )::integer as rank,
  season_year,
  season_number,
  name,
  nickname,
  games_played,
  total_buy_ins,
  round((wins::numeric / nullif(games_played, 0)) * 100, 2)::double precision as win_percentage,
  wins,
  round(total_points::numeric / nullif(games_played, 0), 2)::double precision as ppg,
  total_points,
  winnings::double precision as winnings,
  sum_bounties_won::double precision as sum_bounties_won,
  total_bounties_count,
  round(total_bounties_count::numeric / nullif(games_played, 0), 2)::double precision as bpg
from aggregated;

grant select on public.leaderboard_by_season to anon, authenticated;
