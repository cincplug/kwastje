import React from "react";

const Maaike = (props) => {
  const { setup, index, w, h, x1, x2, y1, y2, commonProps } = props;

  const spiralSegments = index;
  const spiralPoints = Array.from({ length: spiralSegments }, (_, i) => {
    const angle = (i * Math.PI * 2) / spiralSegments;
    const radius = (Math.min(w, h) / 10) * setup.modifier;
    const spiralX = x1 + radius * Math.cos(angle);
    const spiralY = y1 + radius * Math.sin(angle);
    return `${spiralX} ${spiralY}`;
  });

  return (
    <path
      d={commonProps.normalize(
        `M${(x2 + w) / 3},${y2} L${x1},${y1} Q${spiralPoints.join(" ")}`
      )}
      {...commonProps}
    />
  );
};

export default Maaike;
