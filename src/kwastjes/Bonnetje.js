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
        textAnchor: "middle",
        fontSize: (x1 / 10) * setup.modifier,
        letterSpacing: Math.min(10, ((w - x1) / 10) * setup.modifier),
        fill: setup.fgColor,
        opacity: (setup.opacity + index) / w,
      }}
    >
      {text || defaultText}
    </text>
  );
};
export default Bonnetje;
