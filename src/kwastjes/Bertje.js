import React from "react";

const Bertje = (props) => {
  const { setup, mouseX, mouseY, coords, commonProps } = props;
  const [x1, y1] = setup.isCentric ? [mouseX, mouseY] : coords;
  const [x, y] = coords;

  const x2 = Math.pow(x, setup.modifier);
  const y2 = y + 100;
  return <path d={`M${x2},${y2} L${x1},${y1}`} {...commonProps} />;
};

export default Bertje;
