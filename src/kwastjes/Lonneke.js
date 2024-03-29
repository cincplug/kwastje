import React from "react";

const Lonneke = (props) => {
  const { setup, index, w, h, x1, y1, y2, commonProps, normalize } = props;

  return (
    <path
      d={normalize(
        `M${x1},${y1} T${Math.round(Math.sin(x1 * index) + w / 2)},${Math.round(
          Math.cos(y1 * index) + h / 2
        )} ${x1 * setup.modifier},${(y2 * setup.modifier) / (index + 1)}`
      )}
      {...commonProps}
    />
  );
};

export default Lonneke;
