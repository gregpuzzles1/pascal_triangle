import React from "react";
import type { HighlightType } from "../../lib/types";

type TriangleCellProps = {
  row: number;
  col: number;
  value: number;
  showNumbers: boolean;
  showHexes: boolean;
  highlight: HighlightType;
  isSelected: boolean;
  isMultiple: boolean;
  onSelect: (row: number, col: number) => void;
  onDoubleSelect: (row: number, col: number) => void;
  onTouchTap: (row: number, col: number) => void;
};

export default function TriangleCell({
  row,
  col,
  value,
  showNumbers,
  showHexes,
  highlight,
  isSelected,
  isMultiple,
  onSelect,
  onDoubleSelect,
  onTouchTap,
}: TriangleCellProps) {
  const classes = [
    "triangle-cell",
    showHexes ? "hex" : "hex hex--hidden",
    highlight === "pathA" ? "highlight-a" : "",
    highlight === "pathB" ? "highlight-b" : "",
    isMultiple && highlight === "none" ? "multiple" : "",
    isSelected ? "selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (event.shiftKey) {
        onDoubleSelect(row, col);
      } else {
        onSelect(row, col);
      }
    }
  };

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onSelect(row, col)}
      onDoubleClick={() => onDoubleSelect(row, col)}
      onTouchEnd={() => onTouchTap(row, col)}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      aria-label={`Row ${row + 1}, position ${col + 1}, value ${value}`}
    >
      <span className={showNumbers ? "cell-value" : "cell-value hidden"}>{value}</span>
    </button>
  );
}
