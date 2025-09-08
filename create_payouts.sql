-- Bảng lưu lịch sử thanh toán hoa hồng cho CTV
create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  collaborator_ref text not null,
  amount numeric not null default 0,
  note text,
  created_at timestamp with time zone default now()
);

