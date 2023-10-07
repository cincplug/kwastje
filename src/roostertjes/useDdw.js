import { useRef, useState, useEffect } from "react";
import { customKwastjes } from "../kwastjes";
import subs from "./useDdwSubs.json";

const useTour = (props) => {
  const { setSetup, isRoostertje } = props;
  const [activeSub, setActiveSub] = useState(0);
  const subDuration = 5000;
  const roosterClass = "cogni-ddw";
  const altBg = ["#000048", "#2b318a", "#7373d8", "#2b6cb2", "#2e308e"];
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

          setActiveSub((prevActiveSub) => {
            return prevActiveSub === subs.length - 1 ? 0 : prevActiveSub + 1;
          });

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

          tasks[0].previousTime.current = timestamp;
        }
        tasks[0].requestRef.current = requestAnimationFrame(tasks[0].effort);
      },
      requestRef: useRef(null),
    },
  ];

  useEffect(() => {
    if (isRoostertje) {
      setSetup((prevSetup) => {
        return {
          ...prevSetup,
          kwastje: 1,
          isFluent: true,
        };
      });
    }
  }, [isRoostertje, setSetup]);

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
