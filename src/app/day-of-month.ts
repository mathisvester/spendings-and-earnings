export function lastDayOfMonth(year: number, monthIndex: number): Date {
  return new Date(year, monthIndex + 1, 0);
}

export function daysOfMonth(year: number, monthIndex: number): number {
  return lastDayOfMonth(year, monthIndex).getDate();
}

export function validateDayOfMonth(
  date: Date,
  year: number,
  monthIndex: number
): boolean {
  return date.getDate() <= daysOfMonth(year, monthIndex);
}
