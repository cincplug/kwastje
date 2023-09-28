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
    y2,
    commonProps,
  } = props;

  // const x3 = x2 + index / 2;
  // const y3 = y2 * index * setup.modifier / x2;
  return (
    <path
      d={commonProps.normalize(
        `M${x1 / 10},${x2 / setup.modifier - w / index} L${x1},${
          y1 * setup.modifier
        } h${x1 / index} a10 ${index} 0 0 1 ${x1 / index},${y1 / index} v${y1} a${index} 10 0 0 1 ${x1 / index}
        } Z`
      )}
      {...commonProps}
    />
  );
};

export default Maurtje;
