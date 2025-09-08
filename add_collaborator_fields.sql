-- Thêm cột mã mời và hoa hồng CTV cho bảng accounts
alter table public.accounts add column if not exists collaborator_ref text;
alter table public.accounts add column if not exists collaborator_commission_pct numeric;
alter table public.accounts add column if not exists collaborator_commission numeric;

