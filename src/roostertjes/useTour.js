import { useRef } from "react";
import { customKwastjes } from "../kwastjes";

const useTour = (props) => {
  const { setAltBgIndex, setSetup } = props;
  const altBg = [
    "#2233aa",
    "#aa3322",
    "#22aa33",
    "#22aabb",
    "#bbaa22",
    "#4488dd",
    "#dd4488",
    "#88dd44",
    "#cc55aa",
    "#aacc44",
  ];
  const scheduledTasks = [
    {
      name: "kwastje",
      interval: 5000,
      previousTime: useRef(0),
      task: (timestamp) => {
        if (
          timestamp - scheduledTasks[0].previousTime.current >=
          scheduledTasks[0].interval
        ) {
          setSetup((prevSetup) => {
            return {
              ...prevSetup,
              kwastje:
                prevSetup.kwastje < Object.keys(customKwastjes).length
                  ? prevSetup.kwastje / 1 + 1
                  : 1,
            };
          });
          scheduledTasks[0].previousTime.current = timestamp;
        }
        scheduledTasks[0].requestRef.current = requestAnimationFrame(
          scheduledTasks[0].task
        );
      },
      requestRef: useRef(null),
    },
    {
      name: "bgColor",
      interval: 7000,
      previousTime: useRef(0),
      task: (timestamp) => {
        if (
          timestamp - scheduledTasks[1].previousTime.current >=
          scheduledTasks[1].interval
        ) {
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
          scheduledTasks[1].previousTime.current = timestamp;
        }
        scheduledTasks[1].requestRef.current = requestAnimationFrame(
          scheduledTasks[1].task
        );
      },
      requestRef: useRef(null),
    },
  ];

  return scheduledTasks;
};

export default useTour;
