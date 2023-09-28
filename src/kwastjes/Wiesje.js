import React from "react";

const Wiesje = (props) => {
  const {
    // setup,
    // index,
    w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
  } = props;

  return (
    <path transform={`scale(0.5) translate(${x1}, ${y1})`}
      d={commonProps.normalize(
        `M${x1},${y1} q${x2} ${y2}, ${y1} ${x1} L${w/2}, ${h/2} q${-x1} ${-y1}, ${-y2} ${-x2}  `
      )}
      {...commonProps}
    />
  );
};

export default Wiesje;
