import type { CellCoord } from "./types";

export function getPathA(row: number, col: number): CellCoord[] {
  const path: CellCoord[] = [{ row, col }];
  if (row - 1 >= 0) {
    path.push({ row: row - 1, col });
  }
  for (let k = 2; row - k >= 0 && col - (k - 1) >= 0; k += 1) {
    path.push({ row: row - k, col: col - (k - 1) });
  }
  return path;
}

export function getPathB(row: number, col: number): CellCoord[] {
  const path: CellCoord[] = [{ row, col }];
  if (row - 1 >= 0 && col - 1 >= 0) {
    path.push({ row: row - 1, col: col - 1 });
  }
  for (let k = 2; row - k >= 0 && col - 1 <= row - k; k += 1) {
    path.push({ row: row - k, col: col - 1 });
  }
  return path;
}

export function isEdgeCell(row: number, col: number): boolean {
  return col === 0 || col === row;
}

export function computeHighlightPaths(row: number, col: number) {
  const pathA = getPathA(row, col);
  const pathB = isEdgeCell(row, col) ? [] : getPathB(row, col);
  return { pathA, pathB };
}
