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
  const storedSetupRaw = localStorage.getItem(storageSetupItem);
  const storedSetup = storedSetupRaw ? JSON.parse(storedSetupRaw) : null;
  const initialSetup = {};
  defaultSetup.forEach((item) => {
    initialSetup[item.id] = storedSetup ? storedSetup[item.id] : item.value;
  });
  const [setup, setSetup] = useState(initialSetup);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [count, setCount] = useState(0);
  const initialPath = fillPath();
  const [path, setPath] = useState(initialPath);
  const [isPaused, setIsPaused] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [kwastjeName, setKwastjeName] = useState("");
  const menuVisibilityClass = isMenuVisible ? "expanded" : "collapsed";
  const bgClass = setup.hasBg ? "has-bg" : "no-bg";
  const fgColor = `${setup.fgColor}${parseInt(setup.opacity).toString(16)}`;
  useAnimationFrame((deltaTime) => {
    setCount((prevCount) =>
      Math.ceil((prevCount + deltaTime * 0.01) % setup.dotsCount)
    );
  });

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
    setIsPaused(false);
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
    if (isPaused) return null;
    setMouseX(event.pageX || event.touches[0].pageX);
    setMouseY(event.pageY || event.touches[0].page);
    if (isMouseDown && count % setup.latency === 0) {
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
      localStorage.setItem(storageSetupItem, JSON.stringify(nextSetup));
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
          {id === "kwastje" && (
            <label htmlFor={id} className="control__label control__label--name">
              {kwastjeName}
            </label>
          )}
          <input
            className="control__input"
            {...{ type, id, value, min, max, step, checked, style }}
            onChange={(event) => {
              handleInputChange(event);
            }}
          />
          <label className="control__label" htmlFor={id}>
            {label}
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
        }}
      />
      <main
        ref={mainRef}
        className="content"
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseUp={(event) => handleMouseUp(event)}
        onTouchMove={(event) => handleMouseMove(event)}
        onTouchStart={(event) => handleMouseDown(event)}
        onTouchEnd={(event) => handleMouseUp(event)}
        onDoubleClick={() => setIsPaused(true)}
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
            <g
              transform={`rotate(${setup.angle} 0 0)`}
              transform-origin={"center"}
            >
              <Filters {...{ h, x: mouseX, y: mouseY, setup }} />
              <Drawing {...{ path, setup, mouseX, mouseY, w, h, fgColor }} />
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
