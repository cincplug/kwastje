import React from "react";

const Bonnetje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    // x2,
    y1,
    y2,
    commonProps,
    // normalize,
    text,
  } = props;

  const defaultText = Math.round(y2);
  return (
    <text
      {...commonProps}
      x={x1}
      y={y1}
      style={{
        fontSize: x1 / 10 * setup.modifier,
        letterSpacing: ((w - x1) / 10) * setup.modifier,
        fill: setup.fgColor,
        opacity: (setup.opacity + index) / 1000,
      }}
    >
      {(text || defaultText)
        .toString()
        .slice(0, 10)
        .split()
        .map((t, ti) => (
          <tspan key={ti}>{t}</tspan>
        ))}
    </text>
  );
};

export default Bonnetje;
