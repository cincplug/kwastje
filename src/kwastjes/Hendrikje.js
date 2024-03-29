import React from "react";

const Hendrikje = (props) => {
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

  const garmentSize = 10 * setup.modifier;

  return (
    <path
      d={normalize(
        `M${x1},${y1} C${x2} ${y2}, ${Math.pow(y1, setup.modifier)} ${
          Math.pow(x1, setup.modifier) / garmentSize
        }, ${y2} ${x2} v${garmentSize} h${garmentSize}`
      )}
      {...commonProps}
    />
  );
};

export default Hendrikje;
