import React from "react";

const Laurtje = (props) => {
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
    normalize,
  } = props;

  // const x3 = x2 + index * 2;
  // const y3 = y2 * index * setup.modifier;
  return (
    <>
      <path
        d={normalize(
          `M${x1},${y1} v${x2 / 2} l${y2} 200 ${
            index > 15 && index < setup.dotsCount - 15 ? `v-200 h${-y2} Z` : `h100 v20 h${-y2 - 300} Z`
          }`
        )}
        {...commonProps}
      />
      {[...Array(index).keys()].map((step) => (
        <circle
          {...commonProps}
          opacity="0.05"
          cx={x1 - 100 + step}
          cy={y1 + 300 + index}
          r={step}
        ></circle>
      ))}
    </>
  );
};

export default Laurtje;
