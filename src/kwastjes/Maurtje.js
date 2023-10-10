import React from "react";

const Maurtje = (props) => {
  const {
    setup,
    index,
    w,
    // h,
    x1,
    x2,
    y1,
    // y2,
    commonProps,
    normalize,
  } = props;

  return (
    <path
      d={normalize(
        `M${x1 / 10},${x2 / setup.modifier - w / (index + 1)} L${x1},${
          y1 * setup.modifier
        } h${x1 / (index + 1)} a10 ${index} 0 0 1 ${x1 / (index + 1)},${
          y1 / (index + 1)
        } v${y1} a${index} 10 0 0 1 ${x1 / (index + 1)}
        } Z`
      )}
      {...commonProps}
    />
  );
};

export default Maurtje;
