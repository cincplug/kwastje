import React from "react";

const Pietje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  return (
    <ellipse
      cx={x1}
      cy={y1}
      rx={x2 / setup.modifier / 2}
      ry={y2 / setup.modifier / 2}
      {...commonProps}
    />
  );
};

export default Pietje;
