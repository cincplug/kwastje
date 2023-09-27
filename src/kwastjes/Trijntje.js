import React from "react";

const Trijntje = (props) => {
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
  } = props;

  const dotsCount = setup.aitjeDotsCount || setup.dotsCount;

  return (
    <>
      <path
        d={commonProps.normalize(
          `M${x1},${y1} L${Math.max(
            w / 2,
            Math.cos(y2) * index
          )},${y2} Q${
            Math.sin(x2 * index) + w * setup.modifier
          } ${x1}, ${x2} ${y1}`
        )}
        {...commonProps}
      />
      {index === dotsCount - 1 && (
        <>
          <circle
            cx={x1 - setup.growth * setup.thickness}
            cy={y1}
            r={(w / x2) * setup.thickness * setup.growth}
            {...commonProps}
          ></circle>
          <circle
            cx={x1 + setup.growth * setup.thickness}
            cy={y1}
            r={(h / y2) * setup.thickness * setup.growth}
            {...commonProps}
          ></circle>
        </>
      )}
    </>
  );
};

export default Trijntje;
