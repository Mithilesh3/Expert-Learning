create extension if not exists pgcrypto;

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  phone text,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  course text,
  message text,
  created_at timestamptz default now()
);

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id),
  course_slug text,
  amount integer,
  payment_id text,
  status text default 'active',
  enrolled_at timestamptz default now()
);
