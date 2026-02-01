export type Theme = "light" | "dark";

export type HighlightType = "none" | "pathA" | "pathB";
export type HighlightMode = "none" | "single" | "double";

export type CellCoord = { row: number; col: number };

export type TriangleSettings = {
  theme: Theme;
  rowsDisplayed: number;
  showNumbers: boolean;
  showHexes: boolean;
  multiplesEnabled: boolean;
  multiplesN: number;
};

export type HighlightSelection = {
  selected: CellCoord | null;
  mode: HighlightMode;
  pathA: CellCoord[];
  pathB: CellCoord[];
};
