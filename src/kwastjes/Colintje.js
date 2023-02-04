import React from "react";

const Colintje = (props) => {
  const { setup, mouseX, mouseY, coords, commonProps } = props;
  const [x1, y1] = setup.isCentric ? [mouseX, mouseY] : coords;
  const [x, y] = coords;

  const x2 = Math.pow(x, setup.modifier);
  const y2 = y + 100;
  const y3 = y * 20;
  return <path d={`M${x2},${y2} L${x1},${y1} L${x1},${y3}`} {...commonProps} />;
};

export default Colintje;
