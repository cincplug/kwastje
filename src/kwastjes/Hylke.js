import React from "react";

const Hylke = (props) => {
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
  } = props;

  const garmentSize = 10 * setup.modifier;

  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} v${garmentSize * 2} h${garmentSize * 2} v${
          -garmentSize * 2
        } Q${x2} ${y2}, ${y1} ${x1 / 2} L${y2},${
          x2 / 2
        } v${garmentSize} h${garmentSize} v${-garmentSize}`
      )}
      {...commonProps}
    />
  );
};

export default Hylke;
