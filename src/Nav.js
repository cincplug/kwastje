import React from "react";
import setupArray from "./_setup.json";

const Nav = (props) => {
  const {
    isMenuVisible,
    setIsMenuVisible,
    menuVisibilityClass,
    getControls,
    download,
    clear,
  } = props;
  return (
    <>
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
    </>
  );
};

export default Nav;
