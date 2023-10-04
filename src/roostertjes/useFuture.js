import { useEffect, useRef, useState } from "react";
import subs from "./useFutureSubs.json";

const useFuture = (props) => {
  const { setSetup, isRoostertje, toggleRoostertje } = props;
  const [activeSub, setActiveSub] = useState(0);
  const subDuration = 3000;

  const tasks = [
    {
      name: "sub",
      interval: subDuration,
      previousTime: useRef(0),
      effort: (timestamp) => {
        if (timestamp - tasks[0].previousTime.current >= tasks[0].interval) {
          tasks[0].previousTime.current = timestamp;
          setActiveSub((prevActiveSub) => {
            if (prevActiveSub === subs.length - 1) {
              tasks.forEach((task) => {
                cancelAnimationFrame(task.requestRef.current);
              });
              toggleRoostertje();
              return 0;
            } else {
              return prevActiveSub + 1;
            }
          });
        }
        tasks[0].requestRef.current = requestAnimationFrame(tasks[0].effort);
      },
      requestRef: useRef(null),
    },
  ];

  useEffect(() => {
    if (isRoostertje)
      setSetup((prevSetup) => {
        return {
          ...prevSetup,
          kwastje: 48,
          fgColor: "#6aa2dc",
          bgColor: "#92bbe6",
          isFluent: true,
        };
      });
  }, [setSetup, isRoostertje]);

  return { tasks, subs, activeSub, setActiveSub, subDuration };
};

export default useFuture;
