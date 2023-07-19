import React, { useEffect, useRef } from "react";
import { ReactComponent as PuntjeSvg } from "./puntjes/puntje.svg";

const Puntje = (props) => {
  const {
    setup,
    index,
    // w,
    // h,
    defaultX1,
    // defaultX2,
    defaultY1,
    // defaultY2,
    commonProps,
  } = props;

  const puntjeRef = useRef(null);

  
  useEffect(() => {
      const shortenPath = (string, count, separator) => {
        const processedPath = string
          .split(separator)
          .slice(0, count)
          .join(separator);
        return commonProps.normalize(processedPath);
      };
      const pathElement = puntjeRef.current.querySelector(".puntje");
      const dAttribute = pathElement.getAttribute("d");
      const shortenedDAtribute = shortenPath(
      dAttribute,
      index,
      "z"
    );
    pathElement.setAttribute("d", shortenedDAtribute);
  },[index, commonProps]);

  return (
    <g
      transformOrigin="center"
      transform={`translate(${defaultX1}, ${defaultY1}) rotate(${
        setup.modifier * index
      }) scale(${setup.growth / 10})`}
      stroke={commonProps.stroke * setup.thickness}
    >
      <PuntjeSvg ref={puntjeRef} />;
    </g>
  );
};

export default Puntje;
