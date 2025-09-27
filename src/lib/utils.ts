import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tính % hoa hồng theo bậc doanh thu
export function calculateCollaboratorCommissionPct(revenue: number): number {
  if (revenue <= 300_000) return 0.10;  // <=300k => 10%
  if (revenue <= 600_000) return 0.15;  // 301k-600k => 15%
  if (revenue <= 900_000) return 0.20;  // 601k-900k => 20%
  return 0.25;  // >901k => 25%
}
