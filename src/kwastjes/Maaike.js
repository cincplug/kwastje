import React from "react";

const Maaike = (props) => {
  const { setup, index, w, h, x1, x2, y1, y2, commonProps, normalize } = props;

  const spiralSegments = Math.ceil((index + 1) / setup.modifier);
  const spiralPoints = Array.from({ length: spiralSegments }, (_, i) => {
    const angle = (i * Math.PI * 2) / spiralSegments;
    const radius = (Math.min(w, h) / 10) * setup.modifier * 2;
    const spiralX = x1 + radius * Math.cos(angle);
    const spiralY = y1 + radius * Math.sin(angle);
    return `${spiralX} ${spiralY}`;
  });

  return (
    <path
      d={normalize(
        `M${(x2 + w) / 3},${y2} L${x1},${y1} C${spiralPoints.join(" ")} Z`
      )}
      {...commonProps}
    />
  );
};

export default Maaike;
