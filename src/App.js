import React, { useState, useEffect, useRef, useCallback } from "react";
import defaultSetup from "./_setup.json";
import { customKwastjes } from "./kwastjes";
import Menu from "./Menu";
import Filters from "./Filters";
import Drawing from "./Drawing";
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
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const fillPath = (
    length = setup.dotsCount,
    defaultValue = [w / 2, h / 2]
  ) => {
    return new Array(length + 1).fill(defaultValue);
  };

  const initialPath = fillPath();
  const [path, setPath] = useState(initialPath);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [kwastjeName, setKwastjeName] = useState("");
  const menuVisibilityClass = isMenuVisible ? "expanded" : "collapsed";
  const bgClass = setup.hasBg ? "has-bg" : "no-bg";
  const [mapje, setMapje] = useState(null);
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

  const processTasje = (svg) => {
    const parser = new DOMParser();
    const tasje = parser.parseFromString(svg, "text/html").body.firstChild;
    const coordinates = [];
    tasje.querySelectorAll("path").forEach((pathElement) => {
      const dAttribute = pathElement.getAttribute("d");
      const strippedPath = dAttribute
        .replace(/[A-Za-z]\s*[\d\s,]*/g, (match) => {
          return match
            .trim()
            .split(/[A-Za-z,\s]+/)
            .join(" ");
        })
        .trim();
      const pairs = strippedPath
        .split(/\s+/)
        .reduce((acc, val, index, array) => {
          if (index % 2 === 0) {
            acc.push([
              parseFloat(val),
              parseFloat(array[Math.min(index + 1, array.length)]),
            ]);
          }
          return acc;
        }, []);
      coordinates.push(pairs);
    });
    const filteredCoordinates = coordinates.flat();
    setMapje(filteredCoordinates);
    return filteredCoordinates;
  };

  const setTasje = (tasje) => {
    setSetup((prevSetup) => {
      let nextSetup;
      if (tasje) {
        const coordinates = processTasje(tasje);
        const tasjeDotsCount = Math.min(Math.max(coordinates.length, 50), 300);
        nextSetup = {
          ...prevSetup,
          tasje,
          tasjeDotsCount,
        };
      } else {
        nextSetup = {
          ...prevSetup,
          tasje: null,
          stencil: 0,
          tasjeDotsCount: null,
        };
        setMapje(null);
      }
      sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
      return nextSetup;
    });
  };

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
          (prevMouseX === mouseX || prevMouseY === mouseY || !mapje))
      ) {
        setMouseX(event.pageX || event.touches[0].pageX);
        setMouseY(event.pageY || event.touches[0].pageY);
        if (event.movementX < 0 && !isReversed) setIsReversed(true);
        if (event.movementX > 0 && isReversed) setIsReversed(false);
      }
      if (isMouseDown || setup.isFluent) {
        const dotsCount = setup.tasjeDotsCount || setup.dotsCount;
        setPath((prevPath) => {
          prevPath[prevPath.length] = [mouseX, mouseY];
          const nextPath = prevPath.slice(
            prevPath.length - dotsCount,
            prevPath.length
          );
          return nextPath;
        });
      }
    },
    [
      isMouseDown,
      isReversed,
      mapje,
      mouseX,
      mouseY,
      prevMouseX,
      prevMouseY,
      setup.tasjeDotsCount,
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
        if (setup.tasjeDotsCount) {
          nextSetup.tasjeDotsCount = null;
        }
      }
      if (type === "checkbox") {
        nextSetup[id] = !nextSetup[id];
      } else {
        nextSetup[id] = ["number", "range"].includes(type) ? value / 1 : value;
      }
      sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
      if (id === "kwastje") {
        updateKwastjeName(value);
      }
      return nextSetup;
    });
  };

  // const handleDoubleClick = () => {
  //   setSetup((prevSetup) => {
  //     return { ...prevSetup, isFluent: !prevSetup.isFluent };
  //   });
  // };

  const updateKwastjeName = useCallback(
    (value = setup.kwastje) => {
      const kwastjeNames = Object.keys(customKwastjes);
      setKwastjeName(kwastjeNames[value - 1]);
    },
    [setup.kwastje]
  );

  const getControls = (controls) => {
    return controls.map((item, index) => {
      const { id, type, min, max, step, description } = item;
      const label = id.replace(/.+([A-Z])/g, " $1").toLowerCase();
      let value = setup[id] || 0;
      if (id === "dotsCount" && setup.tasjeDotsCount) {
        value = setup.tasjeDotsCount;
      }
      const checked = value === true;
      return (
        <fieldset
          className={`control control--${type} control--${id}`}
          key={`${id}-${index}`}
          title={description}
        >
          <input
            className="control__input"
            {...{ type, id, value, min, max, step, checked }}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
          <label className="control__label" htmlFor={id}>
            <span>
              {label}
              {id === "kwastje" && kwastjeName && (
                <span>: {kwastjeName.replace(/(\d)/g, " $1")}</span>
              )}
            </span>
            {type === "range" && <span>{value}</span>}
          </label>
        </fieldset>
      );
    });
  };

  const download = () => {
    const link = document.createElement("a");
    link.download = "download.svg";
    const svg = document.querySelector(".drawing");
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const e = new MouseEvent("click");
    link.href = "data:image/svg+xml;base64," + base64doc;
    link.dispatchEvent(e);
  };

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
    tasks.forEach((task) => {
      task.requestRef.current = requestAnimationFrame(task.effort);
    });
    return () => {
      stopRoostertje();
    };
  };

  const stopRoostertje = () => {
    setIsMenuVisible(true);
    tasks.forEach((task) => {
      cancelAnimationFrame(task.requestRef.current);
    });
  };

  const scheduledTasks = roostertjes.useDdw({
    setup,
    setSetup,
    isRoostertje,
    stopRoostertje,
  });
  const { tasks, slides, activeSlide, roosterClass } = scheduledTasks;

  useEffect(() => {
    updateKwastjeName();
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
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    mouseX,
    mouseY,
    updateKwastjeName,
  ]);

  return (
    <div
      className={`wrapper ${roosterClass || ""}`}
      style={{ background: setup.bgColor }}
    >
      {!isRoostertje && (
        <Menu
          {...{
            setup,
            isMenuVisible,
            setIsMenuVisible,
            menuVisibilityClass,
            getControls,
            download,
            setTasje,
            setSetup,
            toggleRoostertje,
            isRoostertje,
          }}
        />
      )}
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
              <Drawing
                {...{
                  path,
                  setup,
                  mouseX,
                  mouseY,
                  w,
                  h,
                  mapje,
                  isReversed,
                }}
              />
            )}
          </g>
        </svg>
        {isRoostertje && slides && (
          <p
            className={`subtitle--${activeSlide}`}
            style={{
              textShadow: `0 3px 7px ${setup.bgColor}`,
            }}
            dangerouslySetInnerHTML={{ __html: slides[activeSlide].title }}
          />
        )}
      </main>
      {isInfoVisible && (
        <Splash
          setIsInfoVisible={() => setIsInfoVisible((prevState) => !prevState)}
        />
      )}
    </div>
  );
};

export default App;
