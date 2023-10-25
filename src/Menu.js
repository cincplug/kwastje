// import React, { useEffect, useState } from "react";
import defaultSetup from "./_setup.json";
import ControlGroup from "./ControlGroup";
// import { Potrace } from "potrace";

const Menu = (props) => {
  const {
    setup,
    isMenuVisible,
    setIsMenuVisible,
    menuVisibilityClass,
    handleInputChange,
    download,
    // setTasje,
    // setSetup,
    toggleRoostertje,
    isRoostertje,
  } = props;

  // const [svgData, setSvgData] = useState([]);
  // const [tasjeIndex, setTasjeIndex] = useState(null);

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];

  //   if (file && file.type === "image/svg+xml") {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const svgContent = reader.result;
  //       setTasje(svgContent);
  //     };
  //     reader.readAsText(file);
  //   } else {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const imageSrc = e.target.result;
  //       const trace = new Potrace();
  //       trace.setParameters({
  //         turdSize: 1020,
  //         optTolerance: 800,
  //       });
  //       trace.loadImage(imageSrc, (error) => {
  //         if (error) {
  //           console.error("Error loading image:", error);
  //           return;
  //         }
  //         const svg = trace.getSVG();
  //         setTasje(svg);
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleTasjeClick = (svgContent, index) => {
  //   if (tasjeIndex !== index) {
  //     setTasje(svgContent);
  //     setTasjeIndex(index);
  //   } else {
  //     setTasjeIndex(null);
  //     setTasje(null);
  //     setSetup((prevSetup) => {
  //       return {
  //         ...prevSetup,
  //         stencil: 0,
  //       };
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const importAll = (r) => {
  //     return r.keys().map(r);
  //   };
  //   const tasjes = importAll(
  //     require.context("./tasjes/", false, /\.(png|jpe?g|svg)$/)
  //   );

  //   const loadSvgFiles = async () => {
  //     const svgPromises = tasjes.map((fileNumber) =>
  //       fetch(fileNumber).then((response) => response.text())
  //     );
  //     const loadedSvgData = await Promise.all(svgPromises);
  //     setSvgData(loadedSvgData);
  //   };

  //   loadSvgFiles();
  // }, []);

  const isRoostertjeClass = isRoostertje ? "roostertje" : "";

  return (
    <>
      <button
        className={`menu__toggle menu__toggle--${
          isMenuVisible ? "expanded" : "collapsed"
        }`}
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        title="toggle"
        aria-controls="mainNav"
        aria-expanded={isMenuVisible}
      ></button>
      <nav
        id="mainNav"
        className={`menu menu--controls menu--${menuVisibilityClass}`}
        onClick={() => !isMenuVisible && setIsMenuVisible(true)}
        aria-label="Main menu"
        hidden={!isMenuVisible}
      >
        <ControlGroup
          {...{ setup, handleInputChange }}
          controls={defaultSetup.filter(
            (control) => !control.isHidden && !control.isRight
          )}
        />
        <button
          className="control__input control__button control__button--save"
          onClick={() => {
            download();
          }}
        >
          Save
        </button>
        <button
          className="control__input control__button control__button--clear"
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
        >
          Reset
        </button>
        <div
          className={`roostertje__overlay roostertje__overlay--${isRoostertjeClass}`}
        />
        <button
          htmlFor="roostertje"
          className="control__button roostertje"
          key={"roostertje"}
          onClick={() => {
            toggleRoostertje();
          }}
        >
          {isRoostertje ? "Stop" : "Start"} ddw slides
        </button>
      </nav>
      {/* <nav
        className={`menu menu--filters menu--${menuVisibilityClass} menu--${isRoostertjeClass}`}
      >
        <div className="tasjes">
          {svgData.map((svgContent, index) => (
            <button
              key={index}
              className={`navtasje ${
                index === tasjeIndex ? "selected" : "unselected"
              }`}
              dangerouslySetInnerHTML={{ __html: svgContent }}
              onClick={() => handleTasjeClick(svgContent, index)}
            />
          ))}
          {setup.tasje && (
            <ControlGroup
              {...{ setup, handleInputChange }}
              controls={defaultSetup.filter(
                (control) => !control.isHidden && control.isRight
              )}
            />
          )}
          <input
            type="file"
            accept=".svg, .png, .jpg"
            onChange={handleFileUpload}
            placeholder="Add an tasje"
            key={"add-tasje-input"}
            id="add-tasje"
            className="add-tasje"
          />
          <label
            htmlFor="add-tasje"
            className="control__button"
            key={"add-tasje-label"}
          >
            Add tasje
          </label>
        </div>
      </nav> */}
    </>
  );
};

export default Menu;
