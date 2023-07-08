import React from "react";

const Trijntje = (props) => {
  const {
    setup,
    index,
    w,
    h,
    defaultX1,
    defaultX2,
    defaultY1,
    defaultY2,
    commonProps,
  } = props;

  return (
    <>
      <path
        d={commonProps.normalize(
          `M${defaultX1},${defaultY1} L${Math.max(
            w / 2,
            Math.cos(defaultY2) * index
          )},${defaultY2} Q${
            Math.sin(defaultX2 * index) + w * setup.modifier
          } ${defaultX1}, ${defaultX2} ${defaultY1}`
        )}
        {...commonProps}
      />
      {index === setup.dotsCount - 1 && (
        <>
          <circle
            cx={defaultX1 - setup.growth * setup.thickness}
            cy={defaultY1}
            r={(w / defaultX2) * setup.thickness * setup.growth}
            {...commonProps}
          ></circle>
          <circle
            cx={defaultX1 + setup.growth * setup.thickness}
            cy={defaultY1}
            r={(h / defaultY2) * setup.thickness * setup.growth}
            {...commonProps}
          ></circle>
        </>
      )}
    </>
  );
};

export default Trijntje;
