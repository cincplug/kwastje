import React from "react";

const Janneke = (props) => {
  const { index, h, x1, y1, commonProps } = props;
  return (
    <>
      {[...Array(Math.ceil(index / 3)).keys()].map((step) => (
        <circle
          {...commonProps}
          cx={x1 + step}
          cy={y1 + step}
          r={Math.min(h, step * (index + 1))}
        ></circle>
      ))}
    </>
  );
};

export default Janneke;
