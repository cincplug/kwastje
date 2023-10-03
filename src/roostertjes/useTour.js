import { useRef, useState } from "react";
import { customKwastjes } from "../kwastjes";

const useTour = (props) => {
  const { setSetup } = props;
  const altBg = [
    "#224477",
    "#227744",
    "#772244",
    "#774422",
    "#447722",
    "#442277",
    "#447777",
    "#444477",
    "#774444",
    "#777744",
  ];
  const [, setAltBgIndex] = useState(0);
  const tasks = [
    {
      name: "kwastje",
      interval: 5000,
      previousTime: useRef(0),
      effort: (timestamp) => {
        if (timestamp - tasks[0].previousTime.current >= tasks[0].interval) {
          setSetup((prevSetup) => {
            return {
              ...prevSetup,
              kwastje:
                prevSetup.kwastje < Object.keys(customKwastjes).length
                  ? prevSetup.kwastje / 1 + 1
                  : 1,
            };
          });
          tasks[0].previousTime.current = timestamp;
        }
        tasks[0].requestRef.current = requestAnimationFrame(tasks[0].effort);
      },
      requestRef: useRef(null),
    },
    {
      name: "bgColor",
      interval: 7000,
      previousTime: useRef(0),
      effort: (timestamp) => {
        if (timestamp - tasks[1].previousTime.current >= tasks[1].interval) {
          setAltBgIndex((prevAltBgIndex) => {
            const nextAltBgIndex =
              prevAltBgIndex < altBg.length - 1 ? prevAltBgIndex + 1 : 0;
            setSetup((prevSetup) => {
              return {
                ...prevSetup,
                bgColor: altBg[nextAltBgIndex],
              };
            });
            return nextAltBgIndex;
          });
          tasks[1].previousTime.current = timestamp;
        }
        tasks[1].requestRef.current = requestAnimationFrame(tasks[1].effort);
      },
      requestRef: useRef(null),
    },
  ];

  return { tasks, setAltBgIndex };
};

export default useTour;
