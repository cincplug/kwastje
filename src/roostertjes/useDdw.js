import { useRef, useState } from "react";
import { customKwastjes } from "../kwastjes";
import slides from "./useDdwSlides.json";

const useDdw = (props) => {
  const { setSetup } = props;
  const [activeSlide, setActiveSlide] = useState(0);
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
          setActiveSlide((prevActiveSlide) => {
            const isLastSlide = prevActiveSlide === slides.length - 1;
            const getNextSlideSetup = (currentIndex) => {
              const { modifySetup } = slides[currentIndex];
              const newKwastjeIndex =
                Object.keys(customKwastjes).findIndex(
                  (currentKwastje) =>
                    currentKwastje === slides[currentIndex].kwastje
                ) + 1;
              return {
                ...modifySetup,
                kwastje: newKwastjeIndex,
              };
            };
            const currentIndex = isLastSlide ? 0 : prevActiveSlide + 1;
            setSetup((prevSetup) => ({
              ...prevSetup,
              ...getNextSlideSetup(currentIndex),
            }));

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

  return {
    tasks,
    setAltBgIndex,
    slides,
    activeSlide,
    setActiveSlide,
    slideDuration,
    roosterClass,
  };
};

export default useDdw;
