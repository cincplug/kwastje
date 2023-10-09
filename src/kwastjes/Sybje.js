import React from "react";

const Sybje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  const langje = index * setup.modifier;
  const kortje = Math.min(index - 20, 1) * setup.modifier;

  return (
    <path
      d={normalize(
        `M${x1 / 2},${y1} l${-kortje}${-langje} ${[
          ...Array(Math.min(10, index)).keys(),
        ].map(
          (step) =>
            `l${langje},${-langje} ${
              index < step
                ? `m${langje - kortje},${langje - kortje}`
                : `h${kortje} v${-kortje + index}`
            } v${-langje + (index * step) / 2}`
        )}`
      )}
      {...commonProps}
    />
  );
};

export default Sybje;
