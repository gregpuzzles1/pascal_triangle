export function formatYearRange(startYear: number, currentYear = new Date().getFullYear()): string {
  if (currentYear <= startYear) {
    return `${startYear}`;
  }
  return `${startYear}–${currentYear}`;
}
