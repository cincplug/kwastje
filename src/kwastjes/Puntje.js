import React, { useEffect, useRef } from "react";
import { ReactComponent as PuntjeSvg } from "./puntjes/puntje.svg";

const Puntje = (props) => {
  const {
    setup,
    index,
    // w,
    h,
    defaultX1,
    // defaultX2,
    defaultY1,
    defaultY2,
    // commonProps,
    isReversed,
  } = props;

  const puntjeRef = useRef(null);

  useEffect(() => {
    const shortenPath = (inputPath, count, separator) => {
      const strokes = inputPath.split(separator);
      if (isReversed) {
        strokes.reverse();
      }
      const processedPath = strokes.slice(0, count + Math.round(setup.thickness)).join(separator);
      return processedPath;
    };
    const pathElement = puntjeRef.current.querySelector(".puntje");
    const dAttribute = pathElement.getAttribute("d");
    const shortenedDAtribute = shortenPath(dAttribute, index, "z");
    pathElement.setAttribute("d", shortenedDAtribute);
  }, [index, isReversed, setup.thickness]);

  return (
    <g
      transform={`translate(${defaultX1 / 2}, ${defaultY1 / 2}) rotate(${
        setup.modifier * index
      }) scale(${setup.thickness / setup.growth})`}
    >
      {setup.isSimple && (
        <path transform={`translate(${defaultX1 / 2}, ${defaultY2 - h}) scale(${setup.thickness})`}
          d="M244.512 176.045c0 37.878-30.753 68.584-68.689 68.584-37.936 0-68.689-30.706-68.689-68.584s30.753-68.583 68.689-68.583c37.936 0 68.689 30.705 68.689 68.583"
          stroke="#FFB612" strokeWidth={Math.sinh(index / defaultY1 * setup.thickness)}
        />
      )}
      <PuntjeSvg ref={puntjeRef} />;
    </g>
  );
};

export default Puntje;
