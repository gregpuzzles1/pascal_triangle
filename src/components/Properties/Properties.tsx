import React from "react";

export default function Properties() {
  return (
    <section className="content-section" aria-labelledby="properties">
      <h2 id="properties">Pascal’s Triangle properties</h2>
      <p>
        Pascal’s Triangle encodes combinations: the value in row r and position k
        corresponds to “r choose k.” That makes it a compact map of binomial
        coefficients and explains why the triangle appears in algebra, probability,
        and counting.
      </p>
      <p>
        Each interior value is the sum of the two values above it, which creates
        diagonal patterns. The “hockey stick” pattern highlights a diagonal run of
        values whose sum equals the value just below the diagonal.
      </p>
      <p>
        The triangle also reveals symmetry and parity patterns: rows read the same
        left-to-right and right-to-left, and coloring multiples can uncover fractal
        structures like the Sierpiński gasket.
      </p>
    </section>
  );
}
