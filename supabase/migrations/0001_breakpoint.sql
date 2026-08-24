create extension if not exists pgcrypto;

insert into storage.buckets (id, name, public)
values ('breakpoint-images', 'breakpoint-images', true)
on conflict (id) do nothing;

create table analyses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  image_path text not null,
  image_hash text not null,
  image_width int not null,
  image_height int not null,
  ground_truth_lat float8,
  ground_truth_lng float8,
  status text not null default 'uploaded',
  consensus_a jsonb,
  consensus_b jsonb,
  corroboration jsonb,
  ip_hash text,
  delete_after timestamptz
);

create table guesses (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references analyses(id) on delete cascade,
  model_key text not null,
  pass text not null check (pass in ('a', 'b')),
  status text not null,
  result jsonb,
  error text,
  latency_ms int,
  cost_usd numeric
);

create table evidence (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references analyses(id) on delete cascade,
  class text not null check (class = 'place'),
  type text not null,
  observation text not null,
  inference text not null,
  source_type text not null,
  source_url text,
  screenshot_reference text,
  confidence float8 not null check (confidence >= 0 and confidence <= 1),
  created_at timestamptz not null default now()
);

create table investigation_events (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references analyses(id) on delete cascade,
  kind text not null,
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references analyses(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);
