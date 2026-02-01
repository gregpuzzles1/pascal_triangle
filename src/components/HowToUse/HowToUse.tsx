import React from "react";

export default function HowToUse() {
  return (
    <section className="content-section" aria-labelledby="how-to-use">
      <h2 id="how-to-use">How to use</h2>
      <ul>
        <li>Use the Rows slider to set how many rows of the triangle are visible.</li>
        <li>Select any cell to reveal the first highlight path (Path A).</li>
        <li>Double-select a non-edge cell to reveal the mirrored Path B.</li>
        <li>Keyboard alternative: focus a cell and press Enter for Path A, Shift+Enter for Path B.</li>
        <li>Use the toggles to show/hide numbers, show/hide hexes, or color multiples of n.</li>
        <li>Use Reset to clear the selection and highlights.</li>
      </ul>
    </section>
  );
}
