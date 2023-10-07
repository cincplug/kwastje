import React from "react";

const Pietje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    // normalize,
  } = props;

  const modifier = Math.max(1, setup.modifier * 10);

  return (
    <>
      <ellipse
        cx={x1}
        cy={y1}
        rx={x2 / modifier}
        ry={y2 / modifier}
        transform={
          index > setup.dotsCount / 2
            ? `rotate(${(360 / setup.dotsCount) * index} ${x2 / modifier} ${
                y2 / modifier
              }) translate(0 -${x2 / modifier})`
            : ""
        }
        {...commonProps}
      />
    </>
  );
};

export default Pietje;
