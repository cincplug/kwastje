import React, { useEffect, useState } from "react";
import setupArray from "./_setup.json";
import { Potrace } from "potrace";

const Menu = (props) => {
  const {
    isMenuVisible,
    setIsMenuVisible,
    menuVisibilityClass,
    getControls,
    download,
    clear,
    shuffle,
    setAitje,
  } = props;

  const [svgData, setSvgData] = useState([]);
  const [aitjeIndex, setAitjeIndex] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = () => {
        const svgContent = reader.result;
        setAitje(svgContent);
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageSrc = e.target.result;
        const trace = new Potrace();
        trace.setParameters({
          turdSize: 4,
          optTolerance: 6,
        });
        trace.loadImage(imageSrc, function (error) {
          if (error) {
            console.error("Error loading image:", error);
            return;
          }
          const svg = trace.getSVG();
          setAitje(svg);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    function importAll(r) {
      return r.keys().map(r);
    }
    const aitjes = importAll(
      require.context("./aitjes/", false, /\.(png|jpe?g|svg)$/)
    );

    const loadSvgFiles = async () => {
      const svgPromises = aitjes.map((fileNumber) =>
        fetch(fileNumber).then((response) => response.text())
      );
      const loadedSvgData = await Promise.all(svgPromises);
      setSvgData(loadedSvgData);
    };

    loadSvgFiles();
  }, []);

  return (
    <>
      <button
        className="menu__toggle"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        title="toggle"
      ></button>
      <nav
        className={`menu menu--controls menu--${menuVisibilityClass}`}
        onClick={() => !isMenuVisible && setIsMenuVisible(true)}
      >
        {getControls(
          setupArray.filter((control) => !control.isHidden && !control.isRight)
        )}
        <fieldset className="control control--buttons" key="saveSvg">
          <button
            className="control__input control__button control__button--save"
            onClick={() => {
              download();
            }}
          >
            save
          </button>
          <button
            className="control__input control__button control__button--save"
            onClick={() => shuffle()}
          >
            shuffle
          </button>
          <button
            className="control__input control__button control__button--clear"
            onClick={() => {
              clear();
            }}
          >
            clear
          </button>
          <button
            className="control__input control__button control__button--clear"
            onClick={() => {
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            reset
          </button>
        </fieldset>
      </nav>
      <nav className={`menu menu--filters menu--${menuVisibilityClass}`}>
        {getControls(
          setupArray.filter((control) => !control.isHidden && control.isRight)
        )}
        {svgData.map((svgContent, index) => (
          <button
            key={index}
            className={`navaitje ${
              index === aitjeIndex ? "selected" : "unselected"
            }`}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            onClick={() => {
              setAitje(svgContent);
              setAitjeIndex(index);
            }}
          />
        ))}
        <label className="add-aitje">
          <input
            type="file"
            accept=".svg, .png, .jpg"
            onChange={handleFileUpload}
            placeholder="Add an aitje"
          />
          +
        </label>
      </nav>
    </>
  );
};

export default Menu;
