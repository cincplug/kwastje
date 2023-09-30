import React from "react";

const Gertje = (props) => {
  const {
    // setup,
    index,
    // w,
    // h,
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
        `M${x2},${y2}${
          index % 10 === 0 && `L${x1},${y1}`
        } C${x2} ${y2}, ${y1} ${x1}, ${y2} ${x2}`
      )}
      {...commonProps}
    />
  );
};

export default Gertje;
