import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tính % hoa hồng theo bậc doanh thu
export function calculateCollaboratorCommissionPct(revenue: number): number {
  if (revenue <= 100_000) return 0.10;
  if (revenue <= 200_000) return 0.15;
  if (revenue <= 300_000) return 0.20;
  if (revenue <= 400_000) return 0.25;
  if (revenue <= 500_000) return 0.30;
  if (revenue <= 650_000) return 0.35;
  return 0.40;
}
