import React, { useState, useEffect, useRef, useCallback } from "react";
import defaultSetup from "./_setup.json";
import Menu from "./Menu";
import Filters from "./Filters";
import Brushstroke from "./Brushstroke";
import Splash from "./Splash";
import { roostertjes } from "./roostertjes";
import "./App.scss";

const App = () => {
  const mainRef = useRef(null);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const storageSetupItem = "kwastjeSetup";
  const storedSetupRaw = sessionStorage.getItem(storageSetupItem);
  const storedSetup = storedSetupRaw ? JSON.parse(storedSetupRaw) : null;
  const initialSetup = {};
  defaultSetup.forEach((item) => {
    initialSetup[item.id] = storedSetup ? storedSetup[item.id] : item.value;
  });
  if (storedSetup && storedSetup.tasje) {
    initialSetup.tasje = new DOMParser().parseFromString(
      storedSetup.tasje,
      "text/html"
    ).body.firstChild;
  }
  const [setup, setSetup] = useState(initialSetup);
  const [mouseX, setMouseX] = useState(w / 2);
  const [mouseY, setMouseY] = useState(h / 2);

  const fillPath = (
    length = setup.dotsCount,
    defaultValue = [mouseX || w / 2, mouseY || h / 2]
  ) => {
    return new Array(length + 1).fill(defaultValue);
  };

  const initialPath = fillPath();
  const [path, setPath] = useState(initialPath);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const menuVisibilityClass = isMenuVisible ? "expanded" : "collapsed";
  const bgClass = setup.hasBg ? "has-bg" : "no-bg";
  const [isReversed, setIsReversed] = useState(false);
  const [isRoostertje, setIsRoostertje] = useState(false);
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevMouseX = usePrevious(mouseX);
  const prevMouseY = usePrevious(mouseY);

  const handleMouseDown = useCallback(
    (event) => {
      if (event.pointerType === "mouse") {
        event.preventDefault();
      }
      if (!isMouseDown) {
        setIsMouseDown(true);
      }
    },
    [isMouseDown]
  );

  const handleMouseUp = useCallback(
    (event) => {
      if (event.pointerType === "mouse") {
        event.preventDefault();
      }
      // Check if previous path is finished, to avoid connecting the new path with the old one
      // If it wasn't finished, mark it as finished by adding arbitrary string as a third member
      const isPrevPathFinished = path[path.length - 1].length > 2;
      if (!isPrevPathFinished) {
        setPath((prevPath) => {
          const nextPath = prevPath.slice();
          nextPath[nextPath.length - 1].push("stop");
          return nextPath;
        });
      }
      if (isMouseDown) {
        setIsMouseDown(false);
      }
    },
    [isMouseDown, path]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (
        isMouseDown ||
        setup.isFluent ||
        (setup.kwastje === 1 &&
          (prevMouseX === mouseX || prevMouseY === mouseY))
      ) {
        setMouseX(event.pageX || event.touches[0].pageX);
        setMouseY(event.pageY || event.touches[0].pageY);
        if (event.movementX < 0 && !isReversed) setIsReversed(true);
        if (event.movementX > 0 && isReversed) setIsReversed(false);
      }
      if (isMouseDown || setup.isFluent) {
        setPath((prevPath) => {
          prevPath[prevPath.length] = [mouseX, mouseY];
          const nextPath = prevPath.slice(
            prevPath.length - setup.dotsCount,
            prevPath.length
          );
          return nextPath;
        });
      }
    },
    [
      isMouseDown,
      isReversed,
      mouseX,
      mouseY,
      prevMouseX,
      prevMouseY,
      setup.dotsCount,
      setup.isFluent,
      setup.kwastje,
    ]
  );

  const handleInputChange = (event) => {
    setSetup((prevSetup) => {
      const { id, value, type } = event.target;
      const nextSetup = { ...prevSetup };
      if (id === "dotsCount") {
        setPath((prevPath) => {
          if (prevPath.length > value) {
            return prevPath.slice(prevPath.length - value);
          } else {
            return prevPath.concat(fillPath(value - prevPath.length));
          }
        });
      }
      if (type === "checkbox") {
        nextSetup[id] = !nextSetup[id];
      } else {
        nextSetup[id] = ["number", "range"].includes(type) ? value / 1 : value;
      }
      sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
      return nextSetup;
    });
  };

  // const handleDoubleClick = () => {
  //   setSetup((prevSetup) => {
  //     return { ...prevSetup, isFluent: !prevSetup.isFluent };
  //   });
  // };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case ",":
        setSetup((prevSetup) => {
          return {
            ...prevSetup,
            kwastje: prevSetup.kwastje / 1 - 1,
          };
        });
        break;
      case ".":
        setSetup((prevSetup) => {
          return {
            ...prevSetup,
            kwastje: prevSetup.kwastje / 1 + 1,
          };
        });
        break;
      default:
        break;
    }
  };

  const toggleRoostertje = () => {
    setIsRoostertje((prevIsRoostertje) => {
      if (prevIsRoostertje) {
        stopRoostertje();
      } else {
        startRoostertje();
      }
      setSetup((prevSetup) => {
        return {
          ...prevSetup,
          isFluent: !prevIsRoostertje,
        };
      });
      return !prevIsRoostertje;
    });
  };

  const startRoostertje = () => {
    setIsMenuVisible(false);
    task.requestRef.current = requestAnimationFrame(task.effort);
    return () => {
      stopRoostertje();
    };
  };

  const stopRoostertje = () => {
    setIsMenuVisible(true);
    cancelAnimationFrame(task.requestRef.current);
  };

  const scheduledTask = roostertjes.useDdw({
    setup,
    setSetup,
  });
  const { task, activeSlide, roosterClass } = scheduledTask;

  useEffect(() => {
    const mainElement = mainRef.current;
    mainElement.addEventListener("pointerdown", handleMouseDown, {
      passive: false,
    });
    mainElement.addEventListener("pointermove", handleMouseMove, {
      passive: false,
    });
    mainElement.addEventListener("pointerup", handleMouseUp, {
      passive: false,
    });
    // document.addEventListener("dblclick", handleDoubleClick, {
    //   passive: false,
    // });
    document.addEventListener("keyup", handleKeyUp, {
      passive: false,
    });
    return () => {
      mainElement.removeEventListener("pointerdown", handleMouseDown);
      mainElement.removeEventListener("pointermove", handleMouseMove);
      mainElement.removeEventListener("pointerup", handleMouseUp);
      document.removeEventListener("keyup", handleKeyUp);
      // document.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`wrapper ${roosterClass || ""}`}
      style={{ background: setup.bgColor }}
    >
      <main
        ref={mainRef}
        className="content"
        onTouchMove={(event) => handleMouseMove(event)}
        onTouchStart={(event) => handleMouseDown(event)}
        onTouchEnd={(event) => handleMouseUp(event)}
      >
        <svg
          className={`drawing ${bgClass}`}
          viewBox={`0 0 ${w} ${h}`}
          xmlns="http://www.w3.org/2000/svg"
          filter={
            "url(#erode-filter) url(#dilate-filter) url(#blur-filter) url(#freehand-filter) url(#stencil-filter)"
          }
        >
          {setup.hasBg && (
            <rect
              className="bg"
              x={0}
              y={0}
              width={w}
              height={h}
              stroke="none"
              fill={setup.bgColor}
            ></rect>
          )}
          <g className="center-origin" transform-origin={"center"}>
            <Filters {...{ w, h, mouseX, mouseY, setup }} />
            {mouseX && (
              <Brushstroke
                {...{
                  path,
                  setup,
                  mouseX,
                  mouseY,
                  w,
                  h,
                  isReversed,
                }}
              />
            )}
          </g>
        </svg>
        {isRoostertje && setup.subtitle && (
          <p
            className={`subtitle subtitle--${activeSlide}`}
            style={{
              textShadow: `0 3px 7px ${setup.bgColor}`,
            }}
            dangerouslySetInnerHTML={{ __html: setup.subtitle }}
          />
        )}
      </main>
      {!isRoostertje && (
        <Menu
          {...{
            setup,
            isMenuVisible,
            setIsMenuVisible,
            handleInputChange,
            menuVisibilityClass,
            setSetup,
            toggleRoostertje,
            isRoostertje,
          }}
        />
      )}
      {!isRoostertje && setup.isDdwTheme && (
        <Splash setSetup={setSetup} toggleRoostertje={toggleRoostertje} />
      )}
    </div>
  );
};

export default App;
