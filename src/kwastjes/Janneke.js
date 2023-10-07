import React from "react";

const Janneke = (props) => {
  const { index, x1, y1, commonProps } = props;

  return (
    <>
      {[...Array(index).keys()].map((step) => (
        <circle
          {...commonProps}
          cx={x1 + 200 + step}
          cy={y1 + 100 + index}
          r={step * index}
        ></circle>
      ))}
    </>
  );
};

export default Janneke;
