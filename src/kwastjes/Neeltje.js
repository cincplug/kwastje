import React from "react";

const Neeltje = (props) => {
  const { setup, index, w, h, x1, x2, y1, y2, commonProps, normalize } = props;

  const step = h / setup.modifier;
  return (
    <path
      d={normalize(
        `M${y2 * index - w},${x2} h${step} v${step} h-${step} v-${step} ${
          index < setup.dotsCount / 2
            ? `Q${x2} ${y2}, ${y1} ${x1 / 2}`
            : `h-${step} m${-step}, ${-step}`
        }`
      )}
      {...commonProps}
    />
  );
};

export default Neeltje;
