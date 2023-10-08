import { useRef, useState, useEffect } from "react";
import { customKwastjes } from "../kwastjes";
import slides from "./useDdwSlides.json";

const useDdw = (props) => {
  const { setSetup, isRoostertje } = props;
  const [activeSlide, setactiveSlide] = useState(0);
  const slideDuration = 5000;
  const roosterClass = "cogni-ddw";
  const altBg = ["#2b318a", "#7373d8", "#2b6cb2", "#2e308e"];
  const [, setAltBgIndex] = useState(0);
  const tasks = [
    {
      name: "kwastje",
      interval: slideDuration,
      previousTime: useRef(0),
      effort: (timestamp) => {
        if (timestamp - tasks[0].previousTime.current >= tasks[0].interval) {
          setactiveSlide((prevActiveSlide) => {
            const isLastSlide = prevActiveSlide === slides.length - 1;
            if (isLastSlide) {
              const { modifySetup } = slides[prevActiveSlide + 1];
              setSetup((prevSetup) => {
                return {
                  ...prevSetup,
                  ...modifySetup,
                  kwastje: 0,
                };
              });
            } else {
              setSetup((prevSetup) => {
                const { modifySetup } = slides[prevActiveSlide + 1];
                const newKwastjeIndex =
                  Object.keys(customKwastjes).findIndex(
                    (currentKwastje) =>
                      currentKwastje === slides[prevActiveSlide + 1].kwastje
                  ) + 1;
                return {
                  ...prevSetup,
                  ...modifySetup,
                  kwastje: newKwastjeIndex,
                };
              });
            }
            return isLastSlide ? 0 : prevActiveSlide + 1;
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
    slides,
    activeSlide,
    setactiveSlide,
    slideDuration,
    roosterClass,
  };
};

export default useDdw;
