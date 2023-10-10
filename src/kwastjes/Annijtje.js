import React from "react";

const Annijtje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  return (
    <path
      d={normalize(
        `M${x1},${y2} C
        ${Math.min(w / 2, y2 / (index + 1))},
        ${Math.min(h / 2, x2 * (index + 1)) / 2 + index ** setup.modifier}
         ${Math.min(w / 2, x1 * (index + 1)) + index * 10},
         ${y1} 
         ${x2},${y2}`
      )}
      {...commonProps}
    />
  );
};

export default Annijtje;
