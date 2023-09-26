import React, { useState, useEffect, useRef } from "react";
import defaultSetup from "./_setup.json";
import { customKwastjes } from "./kwastjes";
import Menu from "./Menu";
import Filters from "./Filters";
import Drawing from "./Drawing";
import Splash from "./Splash";
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
  if (storedSetup && storedSetup.aitje) {
    initialSetup.aitje = new DOMParser().parseFromString(
      storedSetup.aitje,
      "text/html"
    ).body.firstChild;
  }
  const [setup, setSetup] = useState(initialSetup);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [count, setCount] = useState(0);
  const initialPath = fillPath();
  const [path, setPath] = useState(initialPath);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [kwastjeName, setKwastjeName] = useState("");
  const menuVisibilityClass = isMenuVisible ? "expanded" : "collapsed";
  const bgClass = setup.hasBg ? "has-bg" : "no-bg";
  const fgColor = `${setup.fgColor}${parseInt(setup.opacity).toString(16)}`;
  const [promptje, setPromptje] = useState("");
  const [breedtje, setBreedtje] = useState(500);
  const [hoogtje, setHoogtje] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [mapje, setMapje] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevMouseX = usePrevious(mouseX);
  const prevMouseY = usePrevious(mouseY);

  function processAitje(svg) {
    const parser = new DOMParser();
    const aitje = parser.parseFromString(svg, "text/html").body.firstChild;
    const coordinates = [];
    aitje.querySelectorAll("path").forEach((pathElement) => {
      const dAttribute = pathElement.getAttribute("d");
      const strippedPath = dAttribute
        .replace(/[A-Za-z]\s*[\d\s,]*/g, function (match) {
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
    const filteredCoordinates = fitCoordinates(
      coordinates.flat(),
      setup.aitjeDotsCount || setup.dotsCount
    );
    setMapje(filteredCoordinates);
    return filteredCoordinates;
  }

  function fitCoordinates(array, maxLength) {
    if (array.length <= maxLength) {
      // No modifications needed
      return array;
    }

    var removeCount = array.length - maxLength;
    var removePerSection = Math.floor(removeCount / maxLength);
    var remainingRemoveCount = removeCount % maxLength;
    var modifiedArray = [];

    var sectionSize = Math.ceil(array.length / maxLength);

    for (var i = 0; i < array.length; i++) {
      if (
        i % sectionSize <
        sectionSize - (removePerSection + (i < remainingRemoveCount ? 1 : 0))
      ) {
        modifiedArray.push(array[i]);
      }
    }

    return modifiedArray;
  }

  function setAitje(aitje) {
    if (!aitje) {
      setSetup((prevSetup) => {
        return {
          ...prevSetup,
          aitje: null,
          isMerger: false,
          isStencil: false,
          aitjeDotsCount: null,
        };
      });
    }
    console.info(aitje);
    processAitje(aitje);
    setSetup((prevSetup) => {
      const coordinates = processAitje(aitje);
      const aitjeDotsCount = Math.min(coordinates.length, 300);
      const nextSetup = {
        ...prevSetup,
        aitje,
        isMerger: true,
        // kwastje: 1,
        aitjeDotsCount,
        // opacity: 200,
        // thickness:
        //   prevSetup.kwastje === 1
        //     ? Math.ceil(w / dotsCount)
        //     : prevSetup.thickness,
        // growth: 7,
      };
      sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
      return nextSetup;
    });
  }

  useEffect(() => {
    // let animationFrameId;
    // let counter = 0;
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
    document.addEventListener("keyup", handleKeyUp, {
      passive: false,
    });

    // const animationLoop = () => {
    //   counter++;
    //   animationFrameId = requestAnimationFrame(animationLoop);
    //   if (counter === w) counter = 0;
    //   setCount(counter);
    // };

    // animationLoop();

    return () => {
      mainElement.removeEventListener("pointerdown", handleMouseDown);
      mainElement.removeEventListener("pointermove", handleMouseMove);
      mainElement.removeEventListener("pointerup", handleMouseUp);
      document.removeEventListener("keyup", handleKeyUp);
      // cancelAnimationFrame(animationFrameId);
    };
  }, [handleMouseMove, mouseX, mouseY, updateKwastjeName]);

  function handleMouseDown(event) {
    if (event.pointerType === "mouse") {
      event.preventDefault();
    }
    if (!isMouseDown) {
      setIsMouseDown(true);
    }
  }

  function handleMouseUp(event) {
    if (event.pointerType === "mouse") {
      event.preventDefault();
    }
    if (!(path[path.length - 1].length > 2) && !setup.isJoint) {
      setPath((prevPath) => {
        const nextPath = prevPath.slice();
        nextPath[nextPath.length - 1].push("end");
        return nextPath;
      });
    }
    if (isMouseDown) {
      setIsMouseDown(false);
    }
  }

  function handleMouseMove(event) {
    if (
      isMouseDown ||
      setup.isMouseLocked ||
      (setup.kwastje === 1 &&
        (prevMouseX === mouseX || prevMouseY === mouseY || !setup.isMerger))
    ) {
      setMouseX(event.pageX || event.touches[0].pageX);
      setMouseY(event.pageY || event.touches[0].pageY);
      if (event.movementX < 0 && !isReversed) setIsReversed(true);
      if (event.movementX > 0 && isReversed) setIsReversed(false);
    }
    if (isMouseDown || setup.isMouseLocked) {
      const dotsCount = setup.aitjeDotsCount || setup.dotsCount;
      setPath((prevPath) => {
        if (setup.isCanvas) {
          if (setup.kwastje !== 2) {
            prevPath[prevPath.length - 1] = [mouseX, mouseY];
          }
        } else {
          const randomIndex = Math.round(
            Math.random() * (path.length - 1) +
              dotsCount / setup.modifier / (dotsCount / setup.modifier + 1)
          );
          switch (setup.kwastje) {
            case 1:
            case 2:
            default:
              prevPath[prevPath.length] = [mouseX, mouseY];
              break;
            case 3:
              const [prevX, prevY] = prevPath[randomIndex];
              prevPath[randomIndex + 1] = [mouseX, mouseY];
              prevPath[randomIndex] = [
                (prevX + mouseX * 5) / 6,
                (prevY + mouseY * 5) / 6,
              ];
              break;
            case 4:
              prevPath[randomIndex] = [mouseX, mouseY];
              prevPath[randomIndex + 1] = [
                mouseX * setup.modifier,
                mouseY * setup.modifier,
              ];
              break;
          }
        }
        const nextPath = prevPath.slice(
          prevPath.length - dotsCount,
          prevPath.length
        );
        return nextPath;
      });
      if (setup.isCanvas) {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.strokeStyle = fgColor;
        ctx.lineWidth =
          (setup.thickness * count * setup.growth) / setup.dotsCount;
        ctx.beginPath();
        const [defaultX1, defaultY1] =
          path[path.length ? path.length - 1 : [mouseX, mouseY]];
        ctx.moveTo(defaultX1, defaultY1);
        ctx.lineTo(mouseX, mouseY);
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  function handleInputChange(event) {
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
        if (setup.aitjeDotsCount) {
          setup.aitjeDotsCount = null;
        }
      }
      if (type === "checkbox") {
        nextSetup[id] = !nextSetup[id];
      } else {
        nextSetup[id] = type === "number" ? parseFloat(value) : value;
      }
      sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
      if (id === "kwastje") {
        updateKwastjeName(value);
      }
      return nextSetup;
    });
  }

  function updateKwastjeName(value = setup.kwastje) {
    const kwastjeNames = Object.keys(customKwastjes);
    setKwastjeName(kwastjeNames[value - 1]);
  }

  function getControls(controls) {
    return controls.map((item, index) => {
      const { id, type, min, max, step, description } = item;
      const label = id.replace(/.+([A-Z])/g, " $1").toLowerCase();
      let value = setup[id] || 0;
      if (id === "dotsCount" && setup.aitjeDotsCount) {
        value = setup.aitjeDotsCount;
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
            {label} {id === "kwastje" && kwastjeName}{" "}
            {type === "range" && <span>{value}</span>}
          </label>
        </fieldset>
      );
    });
  }

  function clear() {
    if (setup.isCanvas) {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, w, h);
      setCount(0);
    }
    const initialPath = fillPath();
    setPath(initialPath);
  }

  function fillPath(length = setup.dotsCount, defaultValue = [w / 2, h / 2]) {
    return new Array(length + 1).fill(defaultValue);
  }

  function download() {
    const link = document.createElement("a");
    if (setup.isCanvas) {
      link.download = "download.png";
      link.setAttribute(
        "href",
        document
          .getElementById("canvas")
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();
    } else {
      link.download = "download.svg";
      const svg = document.querySelector(".drawing");
      const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
      const e = new MouseEvent("click");
      link.href = "data:image/svg+xml;base64," + base64doc;
      link.dispatchEvent(e);
    }
  }

  function getRandomInteger(x, y) {
    return (
      Math.floor(Math.random() * (Math.floor(y) - Math.ceil(x) + 1)) +
      Math.ceil(x)
    );
  }

  function shuffle() {
    setSetup((prevSetup) => {
      const { min, max } = defaultSetup.find((item) => item.id === "kwastje");
      return { ...prevSetup, kwastje: getRandomInteger(min, max) };
    });
  }

  const handleKeyUp = (event) => {
    switch (event.key) {
      case ",":
        setSetup((prevSetup) => {
          return {
            ...prevSetup,
            kwastje: parseInt(prevSetup.kwastje) - 1,
          };
        });
        break;
      case ".":
        setSetup((prevSetup) => {
          return {
            ...prevSetup,
            kwastje: parseInt(prevSetup.kwastje) + 1,
          };
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="wrapper" style={{ background: setup.bgColor }}>
      <Menu
        {...{
          isMenuVisible,
          setIsMenuVisible,
          menuVisibilityClass,
          getControls,
          download,
          clear,
          shuffle,
          promptje,
          setPromptje,
          hoogtje,
          setHoogtje,
          breedtje,
          setBreedtje,
          isLoading,
          setIsLoading,
          setAitje,
          processAitje,
          path,
          setup,
          mouseX,
          mouseY,
          w,
          h,
          fgColor,
          count,
          mapje,
        }}
      />
      <main
        ref={mainRef}
        className="content"
        onTouchMove={(event) => handleMouseMove(event)}
        onTouchStart={(event) => handleMouseDown(event)}
        onTouchEnd={(event) => handleMouseUp(event)}
      >
        <canvas
          id="canvas"
          className={`canvas ${bgClass}`}
          width={w}
          height={h}
        />
        {!setup.isCanvas && (
          <svg
            className={`drawing ${bgClass}`}
            viewBox={`0 0 ${w} ${h}`}
            xmlns="http://www.w3.org/2000/svg"
            filter={
              "url(#erode-filter) url(#dilate-filter) url(#blur-filter) url(#freehand-filter)"
            }
          >
            {setup.hasBg && (
              <rect
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
              <Drawing
                {...{
                  path,
                  setup,
                  mouseX,
                  mouseY,
                  w,
                  h,
                  fgColor,
                  count,
                  mapje,
                  isReversed,
                }}
              />
            </g>
          </svg>
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
