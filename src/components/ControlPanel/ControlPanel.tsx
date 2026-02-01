import React from "react";
import type { Theme } from "../../lib/types";

type ControlPanelProps = {
  theme: Theme;
  rowsDisplayed: number;
  maxRows: number;
  showNumbers: boolean;
  showHexes: boolean;
  multiplesEnabled: boolean;
  multiplesN: number;
  onToggleTheme: () => void;
  onSetRows: (rows: number) => void;
  onToggleShowNumbers: () => void;
  onToggleShowHexes: () => void;
  onToggleMultiplesEnabled: () => void;
  onSetMultiplesN: (n: number) => void;
};

export default function ControlPanel({
  theme,
  rowsDisplayed,
  maxRows,
  showNumbers,
  showHexes,
  multiplesEnabled,
  multiplesN,
  onToggleTheme,
  onSetRows,
  onToggleShowNumbers,
  onToggleShowHexes,
  onToggleMultiplesEnabled,
  onSetMultiplesN,
}: ControlPanelProps) {
  return (
    <section className="control-panel" aria-label="Display controls">
      <div className="control-group">
        <button type="button" className="toggle" onClick={onToggleTheme}>
          Theme: {theme === "light" ? "Light" : "Dark"}
        </button>
      </div>

      <div className="control-group">
        <label className="control-label" htmlFor="rows-range">
          Rows: {rowsDisplayed}
        </label>
        <input
          id="rows-range"
          type="range"
          min={1}
          max={maxRows}
          step={1}
          value={rowsDisplayed}
          onChange={(event) => onSetRows(Number(event.target.value))}
        />
      </div>

      <div className="control-group">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={showNumbers}
            onChange={onToggleShowNumbers}
          />
          Show numbers
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={showHexes} onChange={onToggleShowHexes} />
          Show hexes
        </label>
      </div>

      <div className="control-group">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={multiplesEnabled}
            onChange={onToggleMultiplesEnabled}
          />
          Color multiples of n
        </label>
        {multiplesEnabled && (
          <div className="slider-inline">
            <label htmlFor="multiples-range">n: {multiplesN}</label>
            <input
              id="multiples-range"
              type="range"
              min={1}
              max={Math.max(1, rowsDisplayed)}
              step={1}
              value={multiplesN}
              onChange={(event) => onSetMultiplesN(Number(event.target.value))}
            />
          </div>
        )}
      </div>
    </section>
  );
}
