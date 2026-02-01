export function generateTriangle(rows: number): number[][] {
  const triangle: number[][] = [];
  for (let r = 0; r < rows; r += 1) {
    const row: number[] = [];
    for (let c = 0; c <= r; c += 1) {
      const left = triangle[r - 1]?.[c - 1] ?? 0;
      const right = triangle[r - 1]?.[c] ?? 0;
      const value = r === 0 ? 1 : left + right;
      row.push(value);
    }
    triangle.push(row);
  }
  return triangle;
}

export function verifyTriangleBasics(triangle: number[][]): boolean {
  return triangle.every((row, r) => {
    if (row.length !== r + 1) {
      return false;
    }
    return row.every((value, c) => {
      if (c === 0 || c === row.length - 1) {
        return value === 1;
      }
      const left = triangle[r - 1]?.[c - 1] ?? 0;
      const right = triangle[r - 1]?.[c] ?? 0;
      return value === left + right;
    });
  });
}
