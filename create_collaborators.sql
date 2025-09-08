-- Tạo bảng collaborators để lưu CTV và mã giới thiệu
create table if not exists public.collaborators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  ref text not null unique,
  display_name text not null,
  email text not null,
  phone text not null,
  created_at timestamp with time zone default now(),
  constraint fk_collaborators_user foreign key (user_id) references auth.users (id) on delete cascade
);

-- (Tùy chọn) Bật RLS và chính sách cho phép khách (anon) đăng ký CTV
-- LƯU Ý: Chỉ bật nếu bạn muốn cho phép ai cũng có thể tự đăng ký.
-- ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow insert for anon" ON public.collaborators
--   FOR INSERT TO anon WITH CHECK (true);

