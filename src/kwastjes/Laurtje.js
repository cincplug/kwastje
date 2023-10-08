import React from "react";

const Laurtje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    x1,
    // x2,
    y1,
    y2,
    commonProps,
    normalize,
  } = props;

  const modifier = 50 * setup.modifier;
  const stemHeight = 3 * modifier;
  const threshold = 3;

  return (
    <>
      <path
        d={normalize(
          `M${x1},${y1} ${
            index > setup.dotsCount / threshold &&
            index < (setup.dotsCount * (threshold - 1)) / threshold
              ? `h${-y2} v${-stemHeight} h${y2} v${modifier} h${-stemHeight} v${modifier} h${stemHeight} v${modifier}` : `h${modifier} v${stemHeight} h${y2} v${modifier} h${
                  -y2 - modifier
                } v${-stemHeight - modifier}`
              
          }`
        )}
        {...commonProps}
        fill={setup.bgColor}
      />
    </>
  );
};

export default Laurtje;
