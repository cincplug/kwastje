import React, { useEffect, useRef } from "react";
import { ReactComponent as PuntjeSvg } from "./puntjes/puntje.svg";

const Puntje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    x1,
    // x2,
    y1,
    y2,
    // commonProps, normalize,
    isReversed,
  } = props;

  const puntjeRef = useRef(null);

  useEffect(() => {
    const shortenPath = (inputPath, count, separator) => {
      const strokes = inputPath.split(separator);
      if (isReversed) {
        strokes.reverse();
      }
      const processedPath = strokes
        .slice(0, count + Math.round(setup.thickness))
        .join(separator);
      return processedPath;
    };
    const pathElement = puntjeRef.current.querySelector(".puntje");
    const dAttribute = pathElement.getAttribute("d");
    const shortenedDAtribute = shortenPath(dAttribute, index, "z");
    pathElement.setAttribute("d", shortenedDAtribute);
  }, [index, isReversed, setup.thickness]);

  return (
    <g
      transform={`translate(${x1 / 2}, ${y1 / 2}) rotate(${
        setup.modifier * index
      }) scale(${setup.thickness / setup.growth})`}
    >
      <PuntjeSvg ref={puntjeRef} />;
    </g>
  );
};

export default Puntje;
