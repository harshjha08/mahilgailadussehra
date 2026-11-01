-- Run this once in Supabase SQL Editor. Do not put a service-role key in the website.
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id text primary key check (id = 'public'),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id)
);

alter table public.site_admins enable row level security;
alter table public.site_content enable row level security;
grant select on public.site_admins to authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;

drop policy if exists "Admins can read their own allowlist row" on public.site_admins;
create policy "Admins can read their own allowlist row"
  on public.site_admins for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Public can read published site content" on public.site_content;
create policy "Public can read published site content"
  on public.site_content for select to anon, authenticated
  using (id = 'public');

drop policy if exists "Admins can publish site content" on public.site_content;
create policy "Admins can publish site content"
  on public.site_content for insert to authenticated
  with check (
    id = 'public'
    and exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can update site content" on public.site_content;
create policy "Admins can update site content"
  on public.site_content for update to authenticated
  using (
    exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  )
  with check (
    id = 'public'
    and exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  20971520,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Published site media is publicly readable" on storage.objects;
create policy "Published site media is publicly readable"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'site-media'
    and exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'site-media'
    and exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  )
  with check (
    bucket_id = 'site-media'
    and exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  );

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'site-media'
    and exists (
      select 1 from public.site_admins
      where user_id = (select auth.uid())
    )
  );
