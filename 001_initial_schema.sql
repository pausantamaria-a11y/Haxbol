-- HaxBall Clone - Initial Schema
-- Run this in your Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- Profiles table (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  goals_scored int default 0,
  games_played int default 0,
  wins int default 0,
  created_at timestamptz default now()
);

-- Games table
create table public.games (
  id uuid default uuid_generate_v4() primary key,
  status text default 'waiting' check (status in ('waiting', 'playing', 'finished')),
  score_red int default 0,
  score_blue int default 0,
  winner text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Game players table
create table public.game_players (
  id uuid default uuid_generate_v4() primary key,
  game_id uuid references public.games on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  team text check (team in ('red', 'blue')) not null,
  joined_at timestamptz default now(),
  unique(game_id, user_id)
);

-- Ball state (realtime position sync)
create table public.ball_state (
  game_id uuid references public.games on delete cascade primary key,
  x float default 500,
  y float default 300,
  vx float default 0,
  vy float default 0,
  updated_at timestamptz default now()
);

-- Player positions
create table public.player_positions (
  game_id uuid references public.games on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  x float default 200,
  y float default 300,
  updated_at timestamptz default now(),
  primary key (game_id, user_id)
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.games enable row level security;
alter table public.game_players enable row level security;
alter table public.ball_state enable row level security;
alter table public.player_positions enable row level security;

create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

create policy "games_select" on public.games for select using (true);
create policy "games_insert" on public.games for insert with check (auth.role() = 'authenticated');
create policy "games_update" on public.games for update using (auth.role() = 'authenticated');

create policy "game_players_select" on public.game_players for select using (true);
create policy "game_players_insert" on public.game_players for insert with check (auth.role() = 'authenticated');
create policy "game_players_delete" on public.game_players for delete using (auth.uid() = user_id);

create policy "ball_state_select" on public.ball_state for select using (true);
create policy "ball_state_insert" on public.ball_state for insert with check (auth.role() = 'authenticated');
create policy "ball_state_update" on public.ball_state for update using (auth.role() = 'authenticated');

create policy "player_positions_select" on public.player_positions for select using (true);
create policy "player_positions_insert" on public.player_positions for insert with check (auth.uid() = user_id);
create policy "player_positions_update" on public.player_positions for update using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable realtime
alter publication supabase_realtime add table public.games;
alter publication supabase_realtime add table public.game_players;
alter publication supabase_realtime add table public.ball_state;
alter publication supabase_realtime add table public.player_positions;
