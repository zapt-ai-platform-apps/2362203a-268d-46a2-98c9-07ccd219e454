-- Create the posts table
create table posts (
  id serial primary key,
  title text not null,
  content text not null,
  user_id uuid references auth.users,
  created_at timestamp with time zone default now()
);