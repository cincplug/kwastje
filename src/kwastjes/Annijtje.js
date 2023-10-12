import React from "react";

const Annijtje = (props) => {
  const { setup, index, w, h, x1, x2, y1, y2, commonProps, normalize } = props;

  return (
    <>
      <path
        d={normalize(
          `M${x1},${y2} C
        ${Math.min(w / 2, y2 / (index + 1))},
        ${Math.min(h / 2, x2 * (index + 1)) / 2 * index * setup.modifier}
         ${Math.min(w / 2, x1 * (index + 1)) + index * 10},
         ${y1} 
         ${x2},${y2}`
        )}
        {...commonProps}
      />
      {index >= setup.dotsCount - 4 && (
        <circle
          cx={x1 + (index > setup.dotsCount - 3 ? -index : index)}
          cy={y1}
          r={index % 2 === 0 ? index / 3 : index / 2}
          {...commonProps}
        />
      )}
    </>
  );
};

export default Annijtje;
