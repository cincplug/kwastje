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
    toggleRoostertje,
    isRoostertje,
  } = props;

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
    </>
  );
};

export default Menu;
