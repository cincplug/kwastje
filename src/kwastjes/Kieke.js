import React from "react";

const Kieke = (props) => {
  const { index, setup, x1, x2, y1, y2, commonProps, normalize } = props;

  return (
    <path
      d={normalize(`M${x1},
      ${y1}
      L${x2},
      ${y2} m${index}, ${index * 5} l${x1 / (setup.dotsCount / setup.modifier - index)}, ${y1 / (setup.dotsCount / setup.modifier - index)} Z`)}
      {...commonProps}
    />
  );
};

export default Kieke;
