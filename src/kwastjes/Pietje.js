import React from "react";

const Pietje = (props) => {
  const {
    setup,
    // index,
    // w,
    // h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <ellipse
      cx={defaultX1}
      cy={defaultY1}
      rx={defaultX2 / setup.modifier / 2}
      ry={defaultY2 / setup.modifier / 2}
      {...commonProps}
    />
  );
};

export default Pietje;
