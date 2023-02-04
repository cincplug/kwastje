import React from "react";

const Bertje = (props) => {
  const { setup, mouseX, mouseY, coords, commonProps } = props;
  const [x1, y1] = coords;
  const [x, y] = setup.isCentric ? coords : [mouseX, mouseY];

  const x2 = Math.pow(x, setup.modifier);
  const y2 = y + 20;
  return <path d={`M${x1},${y1} L${x2},${y2}`} {...commonProps} />;
};

export default Bertje;
