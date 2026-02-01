export const DOUBLE_TAP_MS = 320;

export type TapState = {
  time: number;
  row: number;
  col: number;
};

export function isDoubleTap(previous: TapState | null, current: TapState): boolean {
  if (!previous) {
    return false;
  }
  if (previous.row !== current.row || previous.col !== current.col) {
    return false;
  }
  return current.time - previous.time <= DOUBLE_TAP_MS;
}
