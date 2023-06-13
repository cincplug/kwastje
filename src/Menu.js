import React, { useEffect, useRef } from "react";
import setupArray from "./_setup.json";

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
  } = props;

  const deferredPromptRef = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      deferredPromptRef.current = event;
      console.warn(deferredPromptRef);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <nav
      className={`menu menu--controls menu--${menuVisibilityClass}`}
      onClick={() => !isMenuVisible && setIsMenuVisible(true)}
    >
      <button
        className="menu__toggle"
        onClick={() => setIsMenuVisible(false)}
        title="toggle"
      ></button>
      {getControls(setupArray.filter((control) => !control.isHidden))}
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
      {/* <fieldset className="control" key="pwatje">
        <button
          className="control__input control__button control__button--save"
          onClick={handleInstallButtonClick}
        >
          Pwatje
        </button>
      </fieldset> */}
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
          /> x{` `} 
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
            callAitje();
          }}
        >
          Aitje
        </button>
        {isLoading && <p className={`loader-message ${isLoading ? "loading" : "not-loading"}`}>Waiting for Aitje <span className="loader">...</span></p>}
      </fieldset>
    </nav>
  );
};

export default Menu;
