import React from "react";
import TriangleCell from "./TriangleCell";
import type { CellCoord, HighlightType } from "../../lib/types";

type TriangleGridProps = {
  triangle: number[][];
  showNumbers: boolean;
  showHexes: boolean;
  selected: CellCoord | null;
  pathASet: Set<string>;
  pathBSet: Set<string>;
  multiplesEnabled: boolean;
  multiplesN: number;
  onSelect: (row: number, col: number) => void;
  onDoubleSelect: (row: number, col: number) => void;
  onTouchTap: (row: number, col: number) => void;
};

function keyFor(row: number, col: number) {
  return `${row}:${col}`;
}

export default function TriangleGrid({
  triangle,
  showNumbers,
  showHexes,
  selected,
  pathASet,
  pathBSet,
  multiplesEnabled,
  multiplesN,
  onSelect,
  onDoubleSelect,
  onTouchTap,
}: TriangleGridProps) {
  return (
    <div className="triangle">
      {triangle.map((rowValues, rowIndex) => (
        <div className="triangle-row" key={`row-${rowIndex}`}>
          {rowValues.map((value, colIndex) => {
            const coordKey = keyFor(rowIndex, colIndex);
            let highlight: HighlightType = "none";
            if (pathBSet.has(coordKey)) {
              highlight = "pathB";
            } else if (pathASet.has(coordKey)) {
              highlight = "pathA";
            }
            const isSelected =
              selected?.row === rowIndex && selected?.col === colIndex;
            const isMultiple =
              multiplesEnabled && value % Math.max(1, multiplesN) === 0;
            return (
              <TriangleCell
                key={coordKey}
                row={rowIndex}
                col={colIndex}
                value={value}
                showNumbers={showNumbers}
                showHexes={showHexes}
                highlight={highlight}
                isSelected={isSelected}
                isMultiple={isMultiple}
                onSelect={onSelect}
                onDoubleSelect={onDoubleSelect}
                onTouchTap={onTouchTap}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
