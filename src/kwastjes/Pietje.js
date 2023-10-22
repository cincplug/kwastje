import React from "react";

const Pietje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    x1,
    x2,
    y1,
    y2,
    commonProps,
    // normalize,
  } = props;

  const modifier = Math.max(1, setup.modifier * 10);
  const eyeModifier = modifier * 4;
  const yOffset = -Math.min(-h / 3, -x2 / modifier);

  return (
    y1 > 0 && (
      <ellipse
        cx={x1}
        cy={y1}
        rx={x2 / modifier + index}
        ry={Math.max(1, y2 / modifier - index)}
        transform={
          index > setup.dotsCount
            ? `rotate(${(360 / setup.dotsCount) * index} ${x2 / modifier} ${
                y2 / modifier
              }) translate(0 ${yOffset})`
            : index < 2
            ? `translate(${
                index % 2 === 0 ? eyeModifier : -eyeModifier
              }, -${yOffset})`
            : ""
        }
        {...commonProps}
        strokeWidth={6 - commonProps.strokeWidth}
      />
    )
  );
};

export default Pietje;
