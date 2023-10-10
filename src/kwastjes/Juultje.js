import React from "react";

const Juultje = (props) => {
  const { setup, index, w, h, x1, x2, y1, y2, commonProps, normalize } = props;

  return (
    <path
      d={normalize(
        `M${x1},${y1} ${
          index % 4 === 0 ? `L${w / 2}, ${Math.sqrt(y2 * index) + h / 2}` : ""
        } ${
          index % 8 === 0
            ? `Q${Math.pow(x2, 1 / (index + 1)) * setup.modifier} ${
                x1 / 2
              }, ${y2} ${y1}`
            : ""
        } Z`
      )}
      {...commonProps}
    />
  );
};

export default Juultje;
