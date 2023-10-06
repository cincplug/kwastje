import { useRef, useState, useEffect } from "react";
import { customKwastjes } from "../kwastjes";
import subs from "./useDdwSubs.json";

const useTour = (props) => {
  const { setSetup, isRoostertje, stopRoostertje } = props;
  const [activeSub, setActiveSub] = useState(-1);
  const subDuration = 5000;
  const roosterClass = "cogni-ddw";
  const altBg = [
    "#06c7cc",
    "#2b318a",
    "#2f78c4",
    "#2e308e",
    "#7373d8",
    "#8b8ee4",
  ];
  const [, setAltBgIndex] = useState(0);
  const tasks = [
    {
      name: "kwastje",
      interval: subDuration,
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
      interval: subDuration,
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
    {
      name: "sub",
      interval: subDuration,
      previousTime: useRef(0),
      effort: (timestamp) => {
        if (timestamp - tasks[2].previousTime.current >= tasks[2].interval) {
          tasks[2].previousTime.current = timestamp;
          setActiveSub((prevActiveSub) => {
            if (prevActiveSub === subs.length - 2) {
              tasks.forEach((task) => {
                cancelAnimationFrame(task.requestRef.current);
              });
              stopRoostertje();
              return -1;
            } else {
              return prevActiveSub + 1;
            }
          });
        }
        tasks[2].requestRef.current = requestAnimationFrame(tasks[2].effort);
      },
      requestRef: useRef(null),
    },
  ];

  useEffect(() => {
    if (isRoostertje) {
      setAltBgIndex(0);
      setSetup((prevSetup) => {
        return {
          ...prevSetup,
          kwastje: 1,
          isFluent: true,
        };
      });
    }
  }, [setSetup, isRoostertje]);

  return {
    tasks,
    setAltBgIndex,
    subs,
    activeSub,
    setActiveSub,
    subDuration,
    roosterClass,
  };
};

export default useTour;
