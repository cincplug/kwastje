import React from "react";

const Maurtje = (props) => {
  const {
    setup,
    index,
    w,
    h,
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
        `M${x1 / 10},${x2 / setup.modifier - w / (setup.dotsCount - index - 1)} L${x1},${
          y1 * setup.modifier
        } ${index >1 ? `a${setup.modifier * 10} ${index} 0 0 1 ${x1 / (setup.dotsCount - index - 1)} ${y1 / (index + 1)}` : ""}`
      )}
      {...commonProps}
    />
  );
};

export default Maurtje;
