export function getPaginationRange(
  current: number,
  total: number,
  siblingCount = 1
): (number | "...")[] {
  const range: (number | "...")[] = [];

  if (total <= 1) return [0];

  const start = Math.max(1, current - siblingCount);
  const end = Math.min(total - 2, current + siblingCount);

  range.push(0);

  if (start > 1) {
    range.push("...");
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (end < total - 2) {
    range.push("...");
  }

  range.push(total - 1);

  return range;
}
