import defaultSetup from "./_setup.json";
import ControlGroup from "./ControlGroup";
import { download } from "./utils";

const Menu = (props) => {
  const {
    setup,
    isMenuVisible,
    setIsMenuVisible,
    menuVisibilityClass,
    handleInputChange,
    toggleRoostertje,
    isRoostertje,
  } = props;

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
        <button
          htmlFor="roostertje"
          className="control__button control__button--roostertje"
          key={"roostertje"}
          onClick={() => {
            toggleRoostertje();
          }}
        >
          {isRoostertje ? "Stop the demo" : "Start the demo"}
        </button>
      </nav>
    </>
  );
};

export default Menu;
