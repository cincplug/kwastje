import React from "react";

const Bonnetje = (props) => {
  const {
    setup,
    // index,
    w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    // normalize,
    text,
  } = props;

  const defaultText = Math.round(y2 / 5);
  return (
    <text
      {...commonProps}
      x={x1}
      y={y1}
      style={{
        fontSize: (x1 / 10) * setup.modifier,
        letterSpacing: ((w - x1) / 100) * setup.modifier,
        fill: setup.fgColor,
        opacity: setup.opacity / 100 / 3,
      }}
    >
      {(text || defaultText)
        .toString()
        .split()
        .map((t, ti) => (
          <tspan transform={`translate(0, ${-((t * setup.modifier) * ti * 200)})`}>{t}</tspan>
        ))}
    </text>
  );
};

export default Bonnetje;
