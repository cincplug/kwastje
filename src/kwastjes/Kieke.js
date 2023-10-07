import React from "react";

const Kieke = (props) => {
  const { x1, x2, y1, y2, commonProps, normalize } = props;

  return (
    <path
      d={normalize(`M${x1},
      ${y1}
      L${x2},
      ${y2}`)}
      {...commonProps}
    />
  );
};

export default Kieke;
