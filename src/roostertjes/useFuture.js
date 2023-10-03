import { useRef } from "react";

const useFuture = (props) => {
  const { setActiveSub, subDuration, setSetup } = props;
  
  const scheduledTasks = [
    {
      name: "sub",
      interval: subDuration,
      previousTime: useRef(0),
      task: (timestamp) => {
        if (
          timestamp - scheduledTasks[0].previousTime.current >=
          scheduledTasks[0].interval
        ) {
          setSetup((prevSetup) => {
            setActiveSub((prevActiveSub) => prevActiveSub + 1);
            console.info(prevSetup.modifier, typeof prevSetup.modifier);
            return {
              ...prevSetup,
              modifier: (prevSetup.modifier / 1 + 0.1).toFixed(1),
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
  ];

  return scheduledTasks;
};

export default useFuture;
