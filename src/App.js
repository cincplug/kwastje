import React, { useState, useEffect, useRef, useCallback } from "react";
import defaultSetup from "./_setup.json";
import { defaultKwastjeNames, customKwastjes } from "./kwastjes";
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
  const [movementX, setMovementX] = useState(0);
  const [movementY, setMovementY] = useState(0);
  useAnimationFrame((deltaTime) => {
    setCount((prevCount) =>
      Math.ceil((prevCount + deltaTime * 0.01) % setup.dotsCount)
    );
  });

  const [promptje, setPromptje] = useState("something");
  const [breedtje, setBreedtje] = useState(500);
  const [hoogtje, setHoogtje] = useState(500);
  const callAitje = async () => {
    try {
      const model = "text-davinci-003";
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          prompt: `Write cleanly formatted SVG element. Output must not contain anything before or after SVG element. Dimensions 500 x 500. SVG should have maximum ${setup.dotsCount} shapes. Try using path and polygon as much as possible. SVG should represent: ${promptje}`,
          model,
          max_tokens: 3000,
        }),
      });

      const data = await response.json();
      const text = data.choices[0].text;
      const textFiltered = text.substring(text.indexOf("<svg"));
      setSetup((prevSetup) => {
        const parser = new DOMParser();
        const aitje = parser.parseFromString(textFiltered, "text/html").body
          .firstChild;
        const nextSetup = {
          ...prevSetup,
          aitje,
        };
        const setupToStore = {
          ...prevSetup,
          aitje: textFiltered,
        };
        sessionStorage.setItem(storageSetupItem, JSON.stringify(setupToStore));
        return nextSetup;
      });
    } catch (error) {
      console.error(error);
    }
  };

  function useAnimationFrame(callback) {
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const animate = useCallback(
      (time) => {
        if (previousTimeRef.current !== undefined) {
          const deltaTime = time - previousTimeRef.current;
          callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
      },
      [callback]
    );
    useEffect(() => {
      updateKwastjeName();
      const mainElement = mainRef.current;
      requestRef.current = requestAnimationFrame(animate);
      mainElement.addEventListener("pointerdown", handleMouseDown, {
        passive: false,
      });
      mainElement.addEventListener("pointermove", handleMouseMove, {
        passive: false,
      });
      mainElement.addEventListener("pointerup", handleMouseUp, {
        passive: false,
      });
      return () => {
        mainElement.removeEventListener("pointerdown", handleMouseDown);
        mainElement.removeEventListener("pointermove", handleMouseMove);
        mainElement.removeEventListener("pointerup", handleMouseUp);
        cancelAnimationFrame(requestRef.current);
      };
    }, [animate]);
  }

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
    if (isMouseDown) {
      setMovementX(event.movementX || 0);
      setMovementY(event.movementY || 0);
      setMouseX(event.pageX || event.touches[0].pageX);
      setMouseY(event.pageY || event.touches[0].pageY);
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
              prevPath[prevPath.length] = [mouseX, mouseY];
              break;
            case 2:
              prevPath[Math.min(count, prevPath.length - 1)] = [mouseX, mouseY];
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
            default:
              prevPath[Math.round(count - 1)] = [mouseX, mouseY];
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
      }
      return nextSetup;
    });
  }

  function updateKwastjeName(value = setup.kwastje) {
    const kwastjeNames = defaultKwastjeNames.concat(
      Object.keys(customKwastjes)
    );
    setKwastjeName(kwastjeNames[value - 1]);
  }

  function getControls(controls) {
    return controls.map((item, index) => {
      const { id, type, min, max, step, description } = item;
      const value = setup[id] || 0;
      const label = id;
      // const label = id.replace(/.+([A-Z])/g, " $1").toLowerCase();
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
          callAitje,
          promptje,
          setPromptje,
          hoogtje,
          setHoogtje,
          breedtje,
          setBreedtje,
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
            <g transform-origin={"center"}>
              <Filters {...{ h, x: mouseX, y: mouseY, setup }} />
              <Drawing
                {...{
                  path,
                  setup,
                  mouseX,
                  mouseY,
                  movementX,
                  movementY,
                  w,
                  h,
                  fgColor,
                  count,
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
