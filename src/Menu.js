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
  } = props;

  const deferredPromptRef = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      deferredPromptRef.current = event;
      console.warn(deferredPromptRef);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallButtonClick = () => {
    if (deferredPromptRef.current) {
      const deferredPrompt = deferredPromptRef.current;
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installed successfully!');
        } else {
          console.log('PWA installation declined.');
        }
        deferredPromptRef.current = null;
      });
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
      <div className="control" key="shuffle">
        <button
          className="control__input control__button control__button--save"
          onClick={() => shuffle()}
        >
          shuffle
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
      <div className="control" key="reset">
        <button
          className="control__input control__button control__button--clear"
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
        >
          reset
        </button>
      </div>
      <div className="control" key="pwatje">
        <button
          className="control__input control__button control__button--clear"
          onClick={handleInstallButtonClick}
        >
          Pwatje
        </button>
      </div>
    </nav>
  );
};

export default Menu;
