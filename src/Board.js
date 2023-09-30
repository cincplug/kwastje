import React, { useState } from "react";
import SVGPath from "svgpath";

const Board = () => {
  const [initialPoints, setInitialPoints] = useState([]);
  const [points, setPoints] = useState([]);
  const [activePoint, setActivePoint] = useState(null);

  const init = () => {
    // Haal de SVG en het path-element op.
    const path = document.querySelector(".drawing").querySelector("path");

    // Haal het "d" attribuut op van het pad.
    const pathData = path.getAttribute("d");

    // Gebruik svgpath om de punten langs het pad te extraheren.
    // console.info(SVGPath.from(pathData));
    const pathArray = SVGPath.from(pathData).segments.map((segment) => [
      segment[1],
      segment[2],
    ]);

    if (pathArray) {
      const extractedPoints = pathArray.map((segment) => ({
        x: segment[segment.length - 2],
        y: segment[segment.length - 1],
      }));

      setInitialPoints(extractedPoints);
      setPoints(extractedPoints);
    }
  };

  const handleMouseDown = (e, index) => {
    setActivePoint(index);
  };

  const handleMouseMove = (e) => {
    if (activePoint !== null) {
      const updatedPoints = [...points];
      updatedPoints[activePoint] = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
      setPoints(updatedPoints);
    }
  };

  const handleMouseUp = () => {
    setActivePoint(null);
  };

  return (
    <svg
      width="519"
      height="449"
      style={{ position: "absolute" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <circle
        cx={300}
        cy={300}
        r={10}
        fill="yellow"
        onMouseDown={() => init()}
        style={{ cursor: "pointer" }}
      />
      <path
        d={`M ${initialPoints.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={5}
          fill="blue"
          onMouseDown={(e) => handleMouseDown(e, index)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </svg>
  );
};

export default Board;
