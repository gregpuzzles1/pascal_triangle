import React, { useEffect, useMemo, useRef, useState } from "react";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import TriangleGrid from "./components/Triangle/TriangleGrid";
import Footer from "./components/Footer/Footer";
import HowToUse from "./components/HowToUse/HowToUse";
import Properties from "./components/Properties/Properties";
import { generateTriangle, verifyTriangleBasics } from "./lib/pascal";
import { computeHighlightPaths, isEdgeCell } from "./lib/highlight";
import { getMaxRowsForWidth } from "./lib/breakpoints";
import { applyTheme, getInitialTheme, persistTheme } from "./lib/theme";
import { isDoubleTap } from "./lib/gestures";
import type { CellCoord, HighlightSelection, Theme } from "./lib/types";

export default function App() {
  const initialMax = getMaxRowsForWidth(window.innerWidth);
  const [maxRows, setMaxRows] = useState<number>(initialMax);
  const [rowsDisplayed, setRowsDisplayed] = useState<number>(initialMax);
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [showNumbers, setShowNumbers] = useState(true);
  const [showHexes, setShowHexes] = useState(true);
  const [multiplesEnabled, setMultiplesEnabled] = useState(false);
  const [multiplesN, setMultiplesN] = useState(1);
  const [selection, setSelection] = useState<HighlightSelection>({
    selected: null,
    mode: "none",
    pathA: [],
    pathB: [],
  });

  const lastTapRef = useRef<CellCoord & { time: number } | null>(null);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      const nextMax = getMaxRowsForWidth(window.innerWidth);
      setMaxRows(nextMax);
      setRowsDisplayed((prev: number) => {
        const clamped = Math.min(prev, nextMax);
        if (clamped !== prev) {
          clearSelection();
        }
        return clamped;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMultiplesN((prev: number) => Math.min(Math.max(1, prev), rowsDisplayed));
  }, [rowsDisplayed]);

  const triangle = useMemo(() => generateTriangle(rowsDisplayed), [rowsDisplayed]);

  useEffect(() => {
    if (import.meta.env.DEV && !verifyTriangleBasics(triangle)) {
      // eslint-disable-next-line no-console
      console.warn("Triangle sanity check failed.");
    }
  }, [triangle]);

  const clearSelection = () => {
    setSelection({ selected: null, mode: "none", pathA: [], pathB: [] });
  };

  const handleSelect = (row: number, col: number, mode: "single" | "double") => {
    const { pathA, pathB } = computeHighlightPaths(row, col);
    const canDouble = mode === "double" && pathB.length > 0 && !isEdgeCell(row, col);
    setSelection({
      selected: { row, col },
      mode: canDouble ? "double" : "single",
      pathA,
      pathB: canDouble ? pathB : [],
    });
  };

  const handleSingleSelect = (row: number, col: number) => handleSelect(row, col, "single");
  const handleDoubleSelect = (row: number, col: number) => handleSelect(row, col, "double");

  const handleTouchTap = (row: number, col: number) => {
    const now = Date.now();
    const current = { row, col, time: now };
    const isDouble = isDoubleTap(lastTapRef.current, current);
    if (isDouble) {
      lastTapRef.current = null;
      handleDoubleSelect(row, col);
    } else {
      lastTapRef.current = current;
      handleSingleSelect(row, col);
    }
  };

  const pathASet = useMemo(
    () => new Set(selection.pathA.map((cell: CellCoord) => `${cell.row}:${cell.col}`)),
    [selection.pathA]
  );
  const pathBSet = useMemo(
    () => new Set(selection.pathB.map((cell: CellCoord) => `${cell.row}:${cell.col}`)),
    [selection.pathB]
  );

  return (
    <div className="app">
      <header className="top-bar">
        <ControlPanel
          theme={theme}
          rowsDisplayed={rowsDisplayed}
          maxRows={maxRows}
          showNumbers={showNumbers}
          showHexes={showHexes}
          multiplesEnabled={multiplesEnabled}
          multiplesN={multiplesN}
          onToggleTheme={() => setTheme(theme === "light" ? "dark" : "light")}
          onSetRows={(rows) => {
            setRowsDisplayed(rows);
            clearSelection();
          }}
          onToggleShowNumbers={() => setShowNumbers((prev: boolean) => !prev)}
          onToggleShowHexes={() => setShowHexes((prev: boolean) => !prev)}
          onToggleMultiplesEnabled={() => setMultiplesEnabled((prev: boolean) => !prev)}
          onSetMultiplesN={(n) => setMultiplesN(n)}
        />
        <div className="reset-container">
          <button type="button" className="reset-button" onClick={clearSelection}>
            Reset
          </button>
        </div>
      </header>

      <main className="triangle-section">
        <TriangleGrid
          triangle={triangle}
          showNumbers={showNumbers}
          showHexes={showHexes}
          selected={selection.selected}
          pathASet={pathASet}
          pathBSet={pathBSet}
          multiplesEnabled={multiplesEnabled}
          multiplesN={multiplesN}
          onSelect={handleSingleSelect}
          onDoubleSelect={handleDoubleSelect}
          onTouchTap={handleTouchTap}
        />
      </main>

      <section className="content">
        <HowToUse />
        <Properties />
      </section>

      <Footer />
    </div>
  );
}
