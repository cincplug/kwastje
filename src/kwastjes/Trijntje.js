import React from "react";

const Trijntje = (props) => {
  const { setup, index, w, h, x1, x2, y1, y2, commonProps, normalize } = props;

  const dotsCount = setup.tasjeDotsCount || setup.dotsCount;

  return (
    <>
      <path
        d={normalize(
          `M${x1},${y1} L${Math.max(w / 2, Math.cos(y2) * index)},${y2} ${
            index % 2 === 0 &&
            `Q${
              Math.sin(x2 * index) + w * setup.modifier
            } ${x1}, ${x2} ${y1} M${x1},${y1} Q${x2} ${y2}, ${y1} ${x1 / 2} z`
          }`
        )}
        {...commonProps}
      />
      {[...Array(index).keys()].map((step) => (
        <>
          {index < dotsCount / 2 && (
            <circle
              cx={(x1 / step) * index * setup.thickness}
              cy={y1}
              r={(w / x2) * setup.thickness * setup.growth + index}
              {...commonProps}
            ></circle>
          )}
          <circle
            cx={x1 + setup.growth * setup.thickness}
            cy={y1}
            r={(h / y2) * setup.thickness * setup.growth + index}
            {...commonProps}
          ></circle>
        </>
      ))}
    </>
  );
};

export default Trijntje;
