import { useRef, useState } from "react";
import { kwastjes } from "../kwastjes";
import slides from "./useDdwSlides.json";

const useDdw = (props) => {
  const { setup, setSetup } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const slideDuration = 5000;
  const roosterClass = "cogni-ddw";
  const altBg = [
    "#2e308e", // plum-300
    "#2b318a", // blue-700
    "#5c60de", // plum
    "#2b6cb2", // blue-500
    "#000048", // brand basic
  ];
  const altFg = [
    "#85a0f9", // plum-100
    "#6aa2dc", // blue-300
    "#06c7cc", // teal-400
    "#2db81f", // green
    "#e9c71d", // yellow
  ];

  const [, setAltColorsIndex] = useState(0);
  const task = {
    name: "kwastje",
    interval: slideDuration,
    previousTime: useRef(0),
    effort: (timestamp) => {
      if (timestamp - task.previousTime.current >= task.interval) {

        setActiveSlide((prevActiveSlide) => {
          const isLastSlide = prevActiveSlide === slides.length - 1;
          const getNextSlideSetup = (currentIndex) => {
            const { modifySetup } = slides[currentIndex];
            const newKwastjeIndex =
              Object.keys(kwastjes).findIndex(
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

        setAltColorsIndex((prevAltColorsIndex) => {
          const altColors = setup.isInverted ? altFg : altBg;
          const nextAltColorsIndex =
            prevAltColorsIndex < altColors.length - 1
              ? prevAltColorsIndex + 1
              : 0;
          setSetup((prevSetup) => {
            const flavour = setup.isInverted
              ? {
                  fgColor: altFg[nextAltColorsIndex],
                  bgColor: "#000000",
                  opacity: 212,
                }
              : {
                  fgColor: "#ffffff",
                  bgColor: altBg[nextAltColorsIndex],
                  opacity: 164,
                };
            return {
              ...prevSetup,
              ...flavour,
            };
          });
          return nextAltColorsIndex;
        });

        task.previousTime.current = timestamp;
      }
      task.requestRef.current = requestAnimationFrame(task.effort);
    },
    requestRef: useRef(null),
  };

  return {
    task,
    setAltColorsIndex,
    slides,
    activeSlide,
    setActiveSlide,
    slideDuration,
    roosterClass,
  };
};

export default useDdw;
