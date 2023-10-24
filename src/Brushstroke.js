import React from "react";
import Bristle from "./Bristle";

const Brushstroke = (props) => {
  const { setup, path, w, h, mouseX, mouseY } = props;
  const pathLength = path.length;
  return path.map((coords, index) => {
    const [brushX, brushY, isStop] = coords;
    const [lastBrushX, lastBrushY] =
      index > 0 ? path[index - 1] : [brushX, brushY];

    return (
      <Bristle
        {...{
          setup,
          index,
          w,
          h,
          brushX,
          brushY,
          isStop,
          mouseX,
          mouseY,
          pathLength,
          lastBrushX,
          lastBrushY,
        }}
        key={`kma-${index}`}
      />
    );
  });
};

export default Brushstroke;
