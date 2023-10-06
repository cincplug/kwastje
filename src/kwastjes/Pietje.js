import React from "react";

const Pietje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    // normalize,
  } = props;

  return (
    <>
      <ellipse
        cx={x1}
        cy={y1}
        rx={x2 / setup.modifier / 2}
        ry={y2 / setup.modifier / 2}
        {...commonProps}
      />
      <line
        {...commonProps}
        x1={w * Math.sin(x1 * (Math.PI / index))}
        x2={x2}
        y1={h * Math.cos(y1 * (Math.PI / index))}
        y2={y2}
      />
    </>
  );
};

export default Pietje;
