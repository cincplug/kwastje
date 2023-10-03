import { useEffect, useRef, useState } from "react";
import subs from "./useFutureSubs.json";

const useFuture = (props) => {
  const { setSetup } = props;
  const [activeSub, setActiveSub] = useState(0);
  const subDuration = 7000;

  const tasks = [
    {
      name: "sub",
      interval: subDuration,
      previousTime: useRef(0),
      effort: (timestamp) => {
        if (timestamp - tasks[0].previousTime.current >= tasks[0].interval) {
          setSetup((prevSetup) => {
            setActiveSub((prevActiveSub) => prevActiveSub + 1);
            return {
              ...prevSetup,
              modifier: (prevSetup.modifier / 1 + 0.1).toFixed(1),
            };
          });
          tasks[0].previousTime.current = timestamp;
        }
        tasks[0].requestRef.current = requestAnimationFrame(tasks[0].effort);
      },
      requestRef: useRef(null),
    },
  ];

  useEffect(() => {
    console.info("mhm");
    setSetup((prevSetup) => {
      return { ...prevSetup, kwastje: 48, bgColor: "#000048" };
    });
  }, [setSetup]);

  return { tasks, subs, activeSub, setActiveSub, subDuration };
};

export default useFuture;
