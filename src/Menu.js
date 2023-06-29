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
    callAitje,
    setPromptje,
    promptje,
    hoogtje,
    setHoogtje,
    breedtje,
    setBreedtje,
    isLoading,
    setAitje,
  } = props;

  const [svgData, setSvgData] = useState([]);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

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
        <fieldset className="control" key="saveSvg">
          <button
            className="control__input control__button control__button--save"
            onClick={() => {
              download();
            }}
          >
            save
          </button>
        </fieldset>
        <fieldset className="control" key="shuffle">
          <button
            className="control__input control__button control__button--save"
            onClick={() => shuffle()}
          >
            shuffle
          </button>
        </fieldset>
        <fieldset className="control" key="clear">
          <button
            className="control__input control__button control__button--clear"
            onClick={() => {
              clear();
            }}
          >
            clear
          </button>
        </fieldset>
        <fieldset className="control" key="reset">
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
        <div className="aitjes-form">
          <fieldset className="control aitje" key="aitje">
            <input
              className="promptje"
              value={promptje}
              placeholder="Ask Aitje"
              onChange={(event) => {
                setPromptje(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  callAitje();
                  handleKeyDown(event);
                }
              }}
            />
            <div>
              <input
                className="promptje mini"
                value={breedtje}
                onChange={(event) => {
                  setBreedtje(event.target.value);
                }}
              />{" "}
              x{` `}
              <input
                className="promptje mini"
                value={hoogtje}
                onChange={(event) => {
                  setHoogtje(event.target.value);
                }}
              />
            </div>
            <button
              className="control__input control__button control__button--save"
              type="submit"
              onClick={() => {
                callAitje("vectortje");
              }}
            >
              vectortje
            </button>
            <button
              className="control__input control__button control__button--save"
              type="submit"
              onClick={() => {
                callAitje("bitmapje");
              }}
            >
              bitmapje
            </button>
            <button
              className="control__input control__button control__button--save"
              type="submit"
              onClick={() => {
                callAitje("componentje");
              }}
            >
              componentje
            </button>
            {isLoading && (
              <p
                className={`loader-message ${
                  isLoading ? "loading" : "not-loading"
                }`}
              >
                Waiting for Aitje <span className="loader">...</span>
              </p>
            )}
          </fieldset>
        </div>
      </nav>
      <nav className={`menu menu--filters menu--${menuVisibilityClass}`}>
        {getControls(
          setupArray.filter((control) => !control.isHidden && control.isRight)
        )}
        {svgData.map((svgContent, index) => (
          <button
            key={index}
            className="navaitje"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            onClick={() => {
              setAitje(svgContent);
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
