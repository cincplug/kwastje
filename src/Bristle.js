import React from "react";
import { customKwastjes } from "./kwastjes";
import { normalize, processColor } from "./utils";

const Bristle = (props) => {
  const {
    setup,
    index,
    w,
    h,
    brushX,
    brushY,
    lastBrushX,
    lastBrushY,
    isStop,
    mouseX,
    mouseY,
    pathLength,
  } = props;
  const isPrevPathFinished = index > 0 && isStop;
  // x1 and y1 are starting coordinates
  // Take them either from current position if previous path is finished
  const [x1, y1] = isPrevPathFinished
    ? [brushX, brushY]
    : [lastBrushX, lastBrushY];

  const [x2, y2] =
    setup.kwastje > 1
      ? [mouseX + index * setup.modifier, mouseY + index * setup.modifier]
      : [brushX, brushY];
  const stroke = processColor(setup.fgColor, setup.opacity);
  const fill = setup.isShaded
    ? processColor(setup.bgColor, setup.opacity)
    : "none";
  const style = null;
  const strokeWidth = Math.max(
    (setup.thickness * index * setup.growth) / pathLength,
    0.5
  );
  const commonProps = { stroke, strokeWidth, fill, style };
  const Kwastje = Object.values(customKwastjes)[setup.kwastje - 1];

  return (
    <>
      {setup.hasEyes && index >= setup.dotsCount - 4 ? (
        <circle
          className={`eyes ${index} ${Math.ceil(x1 - x2)} ${Math.ceil(
            y1 - y2
          )}`}
          cx={x1 + (index >= setup.dotsCount - 2 ? -index : index)}
          cy={y1}
          r={index % 2 === 0 ? index / 2 : index / 3}
          {...commonProps}
          {...{
            fill: processColor(setup.bgColor, index * 3),
            stroke: processColor(setup.fgColor, index * 4),
          }}
        />
      ) : (
        <Kwastje
          {...{
            setup,
            index,
            w,
            h,
            x1,
            x2,
            y1,
            y2,
            commonProps,
            normalize,
            processColor,
            // isReversed,
          }}
        />
      )}
    </>
  );
};

export default Bristle;
