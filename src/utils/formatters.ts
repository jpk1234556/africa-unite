export function formatUGX(amount: number): string {
  return `UGX ${amount.toLocaleString('en-US')}`;
}

export function formatShortUGX(amount: number): string {
  if (amount >= 1_000_000) {
    const val = amount / 1_000_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    const val = amount / 1_000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)}K`;
  }
  return amount.toString();
}

export function calculateFundedPercentage(pool: number, goal: number): number {
  if (goal <= 0) return 0;
  const pct = Math.round((pool / goal) * 100);
  return Math.min(100, Math.max(0, pct));
}
