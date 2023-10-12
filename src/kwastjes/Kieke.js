import React from "react";

const Kieke = (props) => {
  const { index, setup, w, x1, x2, y1, y2, commonProps, normalize } = props;

  return (
    <>
      <path
        d={normalize(`M${x1},
      ${y1}
      m${-index * 10}, ${index * 10} 
      l${Math.max(
        -w / 2,
        Math.min(
          w / 2,
          x1 / (setup.dotsCount / setup.modifier - index * setup.growth)
        )
      )}, ${y1 / (setup.dotsCount * setup.modifier - index)} L${x2},
        ${y2} z`)}
        {...commonProps}
      />
      {index >= setup.dotsCount - 4 && <circle cx={x1 + (index > setup.dotsCount - 3 ? -index : index)} cy={y1} r={index % 2 === 0 ? index / 3 : index / 2} {...commonProps} />}
    </>
  );
};

export default Kieke;
