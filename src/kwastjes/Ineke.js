import React from "react";

const Ineke = (props) => {
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

  return (
    <path
      d={commonProps.normalize(
        `M${x1},${y1} Q${Math.pow(
          y1,
          setup.modifier
        )} ${Math.pow(
          x1,
          setup.modifier
        )}, ${y2} ${x2} L${x2},${y2}`
      )}
      {...commonProps}
    />
  );
};

export default Ineke;
