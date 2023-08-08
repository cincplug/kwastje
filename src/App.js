import React, { useState, useEffect, useRef } from "react";
import defaultSetup from "./_setup.json";
import { customKwastjes } from "./kwastjes";
import Menu from "./Menu";
import Filters from "./Filters";
import Drawing from "./Drawing";
import Splash from "./Splash";
import potrace from "potrace";
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

  const callAitje = async (goal = "vectortje") => {
    const endpoint = goal === "bitmapje" ? "images/generations" : "completions";
    const aiPath = "https://api.openai.com/v1";
    setIsLoading(true);
    try {
      const model = "text-davinci-003";
      const prompt = promptje || "something";
      const requestBody =
        goal === "bitmapje"
          ? {
              prompt: `Simple drawing with 2-5 colors, representing: ${prompt}`,
              response_format: "url",
              size: "512x512",
            }
          : goal === "componentje"
          ? {
              prompt: `Write cleanly formatted <svg> element, with shapes similar to these: ${
                document.querySelector(
                  "path, polygon, polyline, line, rect, circle, ellipse"
                ).outerHTML
              }`,
              model,
              max_tokens: 2000,
            }
          : {
              prompt: `Write cleanly formatted SVG element. Output must not contain anything before or after SVG element. Dimensions ${breedtje} x ${hoogtje}. Use single polyline or polygon element which must have ${setup.dotsCount} points and the main color must go well with ${setup.fgColor} but also be visible on ${setup.bgColor}. Please include in the comment why it goes well. SVG should represent ${prompt}`,
              model,
              max_tokens: 3000,
            };
      const response = await fetch(`${aiPath}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AITJE_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });
      const responseJson = await response.json();
      let content =
        goal === "bitmapje"
          ? responseJson.data[0].url
          : responseJson.choices[0].text;
      if (goal === "bitmapje") {
        potrace.trace(content, function (err, svg) {
          if (err) throw err;
          setAitje(svg);
        });
      } else {
        setAitje(content.substring(content.indexOf("<svg")));
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  function processAitje(svg) {
    const parser = new DOMParser();
    const aitje = parser.parseFromString(svg, "text/html").body.firstChild;
    const coordinates = [];
    aitje.querySelectorAll("path").forEach(pathElement => {
      const dAttribute = pathElement.getAttribute("d");
      const strippedPath = dAttribute.replace(/[A-Za-z]\s*[\d\s,]*/g, function(match) {
        return match.trim().split(/[A-Za-z,\s]+/).join(" ");
      }).trim();
      const pairs = strippedPath.split(/\s+/).reduce((acc, val, index, array) => {
        if (index % 2 === 0) {
          acc.push([parseFloat(val), parseFloat(array[Math.min(index + 1, array.length)])]);
        }
        return acc;
      }, []);
      coordinates.push(pairs);
    });
    const filteredCoordinates = fitCoordinates(coordinates.flat(), setup.dotsCount);
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
    processAitje(aitje);
    setSetup((prevSetup) => {
      const coordinates = processAitje(aitje);
      const dotsCount = Math.min(coordinates.length, 300);
      const nextSetup = {
        ...prevSetup,
        aitje,
        // kwastje: 1,
        dotsCount,
        opacity: 200,
        thickness:
          prevSetup.kwastje === 1
            ? Math.ceil(w / dotsCount)
            : prevSetup.thickness,
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
  });

  function handleMouseDown(event) {
    if (event.pointerType === "mouse") {
      event.preventDefault();
    }
    setIsMouseDown(true);
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
    setIsMouseDown(false);
  }

  function handleMouseMove(event) {
    if (isMouseDown || setup.kwastje === 1) {
      setMouseX(event.pageX || event.touches[0].pageX);
      setMouseY(event.pageY || event.touches[0].pageY);
      if (event.movementX < 0 && !isReversed) setIsReversed(true);
      if (event.movementX > 0 && isReversed) setIsReversed(false);
    }
    if (isMouseDown) {
      setPath((prevPath) => {
        if (setup.isCanvas) {
          if (setup.kwastje !== 2) {
            prevPath[prevPath.length - 1] = [mouseX, mouseY];
          }
        } else {
          const randomIndex = Math.round(
            Math.random() * (path.length - 1) +
              setup.dotsCount /
                setup.modifier /
                (setup.dotsCount / setup.modifier + 1)
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
          prevPath.length - setup.dotsCount,
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
      }
      if (type === "checkbox") {
        nextSetup[id] = !nextSetup[id];
      } else {
        nextSetup[id] = type === "number" ? parseFloat(value) : value;
      }
      sessionStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
      if (id === "kwastje") {
        updateKwastjeName(value);
        if (value === 1) {
          nextSetup.dotsCount = mapje
            ? Math.min(prevSetup.dotsCount, mapje.length)
            : prevSetup.dotsCount;
          nextSetup.thickness = Math.ceil(w / nextSetup.dotsCount);
          nextSetup.growth = 7;
        }
        // delete nextSetup.aitje;
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
      const value = setup[id] || 0;
      // const label = id;
      const label = id.replace(/.+([A-Z])/g, " $1").toLowerCase();
      const checked = value === true;
      const style = type === "range" ? { background: fgColor } : null;
      return (
        <fieldset
          className={`control control--${type} control--${id}`}
          key={`${id}-${index}`}
          title={description}
        >
          <input
            className="control__input"
            {...{ type, id, value, min, max, step, checked, style }}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
          {id === "kwastje" ? (
            <label htmlFor={id} className="control__label--name">
              {setup.kwastje}. {kwastjeName}
            </label>
          ) : (
            <label className="control__label" htmlFor={id}>
              {label} {type === "range" && <span>{value}</span>}
            </label>
          )}
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
    
  }

  return (
    <div
      className="wrapper"
      style={{ background: setup.bgColor }}
    >
      <Menu
        {...{
          isMenuVisible,
          setIsMenuVisible,
          menuVisibilityClass,
          getControls,
          download,
          clear,
          shuffle,
          callAitje,
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
              "url(#displacement-filter) url(#dilate-filter) url(#erode-filter) url(#light-filter) url(#blur-filter) url(#convolve-filter)"
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
              <Filters {...{ h, x: mouseX, y: mouseY, setup }} />
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
