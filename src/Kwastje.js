import React, { useState, useEffect, useRef, useCallback } from "react";
import setupArray from "./_setup.json";
import "./Kwastje.scss";

const Kwastje = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const initialSetup = {};
  setupArray.forEach((item) => {
    initialSetup[item.id] = item.value;
  });
  const [setup, setSetup] = useState(initialSetup);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [count, setCount] = useState(0);
  const initialPath = fillPath();
  const [path, setPath] = useState(initialPath);
  const [isPaused, setIsPaused] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
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
    const animate = useCallback((time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }, [callback]);
    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);
  }

  function handleMouseDown(event) {
    event.preventDefault();
    setIsMouseDown(true);
    setIsPaused(false);
  }
  function handleMouseUp(event) {
    event.preventDefault();
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
    setX(event.pageX);
    setY(event.pageY);
    if (isMouseDown && count % setup.latency === 0) {
      setPath((prevPath) => {
        if (setup.isCanvas) {
          if (setup.kwastje !== 2) {
            prevPath[prevPath.length - 1] = [x, y];
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
              prevPath[prevPath.length] = [x, y];
              break;
            case 2:
              prevPath[Math.min(count, prevPath.length - 1)] = [x, y];
              break;
            case 3:
              const [prevX, prevY] = prevPath[randomIndex];
              prevPath[randomIndex + 1] = [x, y];
              prevPath[randomIndex] = [
                (prevX + x * 5) / 6,
                (prevY + y * 5) / 6,
              ];
              break;
            case 4:
              prevPath[randomIndex] = [x, y];
              prevPath[randomIndex + 1] = [
                x * setup.modifier,
                y * setup.modifier,
              ];
              break;
            default:
              prevPath[Math.round(count - 1)] = [x, y];
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
        const [x1, y1] = path[path.length ? path.length - 1 : [x, y]];
        ctx.moveTo(x1, y1);
        ctx.lineTo(x, y);
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
      return nextSetup;
    });
  }

  function getControls(controls) {
    return controls.map((item, index) => {
      const { id, type, min, max, step } = item;
      const value = setup[id] || 0;
      const label = id.replace(/.+([A-Z])/g, " $1").toLowerCase();
      const checked = value === true;
      const style = type === "range" ? { background: fgColor } : null;
      return (
        <div
          className={`control control--${type} control--${id}`}
          key={`${id}rew${index}`}
        >
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
        </div>
      );
    });
  }

  function getPath(path) {
    return path.map((item, index) => {
      const [x2, y2] =
        setup.kwastje >= 5 ? [(x * index) / 100, y + index] : item;
      const [x1, y1] =
        index > 0
          ? path[index - 1].length > 2
            ? item
            : path[index - 1]
          : setup.isCentric
          ? [w / 2, h / 2]
          : item;
      const stroke = fgColor;
      const fill = setup.isFilled ? `${setup.fgColor}01` : "none";
      const style = null;
      const strokeWidth = Math.max(
        (setup.thickness * index * setup.growth) / path.length,
        0.5
      );
      return (
        <>
          {setup.kwastje === 6 ? (
            <circle
              cx={x1}
              cy={y1}
              r={Math.abs(y2 - x2 / setup.modifier)}
              stroke={stroke}
              fill={fill}
              strokeWidth={strokeWidth}
              key={`c${index}`}
              style={style}
            />
          ) : setup.kwastje === 7 ? (
            <ellipse
              cx={x1}
              cy={y1}
              rx={x2 / setup.modifier / 2}
              ry={y2 / setup.modifier / 2}
              stroke={stroke}
              fill={fill}
              strokeWidth={strokeWidth}
              key={`e${index}`}
              style={style}
            />
          ) : setup.kwastje === 8 ? (
            <polyline
              points={`${x1},${y1} ${x2},${y2} ${y1},${x1} ${y2},${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pl${index}`}
              style={style}
            />
          ) : setup.kwastje === 9 ? (
            <polygon
              points={`${x1},${y1} ${x2},${y2} ${Math.pow(
                y1,
                setup.modifier
              )},${Math.pow(x1, setup.modifier)} ${y2},${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pg${index}`}
              style={style}
            />
          ) : setup.kwastje === 10 ? (
            <path
              d={`M${x1},${y1} L${x2},${y2} M${y1},${x1} L${y2},${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pl${index}`}
              style={style}
            />
          ) : setup.kwastje === 11 ? (
            <path
              d={`M${x1},${y1} L${x2},${y2} M${Math.pow(
                y1,
                setup.modifier
              )},${Math.pow(x1, setup.modifier)} L${y2},${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pg${index}`}
              style={style}
            />
          ) : setup.kwastje === 12 ? (
            <path
              d={`M${x1},${y1} C${x2} ${y2}, ${y1} ${x1}, ${y2} ${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pl${index}`}
              style={style}
            />
          ) : setup.kwastje === 13 ? (
            <path
              d={`M${x1},${y1} C${x2} ${y2}, ${Math.pow(
                y1,
                setup.modifier
              )} ${Math.pow(x1, setup.modifier)}, ${y2} ${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pg${index}`}
              style={style}
            />
          ) : setup.kwastje === 14 ? (
            <path
              d={`M${x1},${y1} Q${x2} ${y2}, ${y1} ${x1} L${y2},${x2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pl${index}`}
              style={style}
            />
          ) : setup.kwastje === 15 ? (
            <path
              d={`M${x1},${y1} Q${Math.pow(y1, setup.modifier)} ${Math.pow(
                x1,
                setup.modifier
              )}, ${y2} ${x2} L${x2},${y2}`}
              strokeWidth={strokeWidth}
              stroke={stroke}
              fill={fill}
              key={`pg${index}`}
              style={style}
            />
          ) : (
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={strokeWidth}
              stroke={stroke}
              key={`l${index}`}
            />
          )}
        </>
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
      <nav
        className={`menu menu--controls menu--${menuVisibilityClass}`}
        onClick={() => !isMenuVisible && setIsMenuVisible(true)}
      >
        <button
          className="menu__toggle"
          onClick={() => setIsMenuVisible(false)}
          title="toggle"
        ></button>
        {getControls(setupArray.filter((control) => !control.isFilter))}
      </nav>
      <nav className={`menu menu--filters menu--${menuVisibilityClass}`}>
        {getControls(setupArray.filter((control) => control.isFilter))}
        <div className="control" key="saveSvg">
          <button
            className="control__input control__button control__button--save"
            onClick={() => {
              download();
            }}
          >
            save
          </button>
        </div>
        <div className="control" key="clear">
          <button
            className="control__input control__button control__button--clear"
            onClick={() => {
              clear();
            }}
          >
            clear
          </button>
        </div>
      </nav>
      <div
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseUp={(event) => handleMouseUp(event)}
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
              {setup.erode && (
                <filter id="erode-filter">
                  <feMorphology operator="erode" radius={setup.erode} />
                </filter>
              )}
              {setup.dilate && (
                <filter id="dilate-filter">
                  <feMorphology operator="dilate" radius={setup.dilate} />
                </filter>
              )}
              <filter id="displacement-filter">
                {setup.turbulence && (
                  <feTurbulence
                    type="turbulence"
                    baseFrequency={setup.thickness}
                    numOctaves={setup.displace}
                    result="turbulence-filter"
                  />
                )}
                {setup.displace && (
                  <feDisplacementMap
                    in2="turbulence-filter"
                    in="SourceGraphic"
                    scale={setup.displace}
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                )}
              </filter>
              <filter id="light-filter">
                {setup.specular && (
                  <feSpecularLighting
                    result="light-filter"
                    specularConstant={setup.thickness}
                    specularExponent={setup.growth}
                    lightingColor={setup.fgColor}
                  >
                    <fePointLight x={x} y={y} z={setup.specular} />
                  </feSpecularLighting>
                )}
                {setup.diffuse && (
                  <feDiffuseLighting
                    result="light-filter"
                    lightingColor={setup.fgColor}
                  >
                    <feSpotLight
                      x={x}
                      y={y}
                      z={setup.diffuse}
                      limitingConeAngle={((y * 1110) / h) * 2}
                    />
                  </feDiffuseLighting>
                )}
                {setup.composite && (
                  <feComposite
                    in2="SourceGraphic"
                    in="light-filter"
                    operator="arithmetic"
                    k1="0"
                    k2={setup.composite}
                    k3="1"
                    k4="0"
                  />
                )}
              </filter>
              {setup.blur && (
                <filter id="blur-filter">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation={setup.blur}
                  />
                </filter>
              )}
              {setup.convolve && (
                <filter id="convolve-filter">
                  <feConvolveMatrix
                    kernelMatrix={`${setup.convolve} 0 0
                ${x} 0 0
                0 0 ${setup.convolve}`}
                  />
                </filter>
              )}
              {getPath(path)}
            </g>
          </svg>
        )}
      </div>
      {/* <div className="info">{JSON.stringify(path, null, 4)}</div> */}
    </div>
  );
};

export default Kwastje;
