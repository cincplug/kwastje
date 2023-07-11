import React from "react";

const Bonnetje = (props) => {
  const {
    setup,
    // index,
    w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
    text,
  } = props;

  const defaultText = Math.round(defaultY2 / 5);
  return (
    <text
      {...commonProps}
      x={defaultX1}
      y={defaultY1}
      style={{
        fontSize: defaultY1 / 2 * setup.modifier,
        letterSpacing: (w - defaultX1) / 100,
        transform: `rotate(${90 - defaultX2}deg)`,
        fill: setup.fgColor,
        opacity: setup.opacity / 100 / 3,
      }}
    >
      {text || defaultText}
    </text>
  );
};

export default Bonnetje;
