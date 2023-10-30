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

  const isRoostertjeClass = isRoostertje ? "roostertje" : "geen-rostertje";

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
        >
          <p>
            Welcome to Kwastje — my sixpence to the Cognizant showcase at Dutch Design Week 2023, hosted in our
            Eindhoven office.
          </p>
          <p>
            Usually, the front-end development is the final destination of visual
            design, a place where design "goes to".
          </p>
          <p>
            But there is also a specific sort of design ideas that emerge <strong>from</strong> the development! 
          </p>
          <p>
            Here's one such idea. Move your cursor and follow these creatures, which are fundamentally nothing but simple SVG shapes replicated in all sorts of sequences, ending with a pair of eyes.
          </p>
          <button
            htmlFor="roostertje"
            className="control__button roostertje"
            key={"roostertje"}
            onClick={() => {
              toggleRoostertje();
            }}
          >
            {isRoostertje ? "Stop the demo" : "Start the demo"}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Menu;
