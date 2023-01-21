import React from "react";
import "./App.scss";

const Splash = (props) => {
  return (
    <div className="splash">
      <iframe
        title="Briefjes"
        src="https://docs.google.com/forms/d/e/1FAIpQLScq3gkUfsWiUm0tV2XKQdcLOkSgxpQKJ8W1T0WHS7XyE9W2nA/viewform?embedded=true"
        width="640"
        height="480"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </iframe>
      <button
        className="control__button control__button--close splash__close"
        onClick={props.setIsInfoVisible}
      >
        Won't do :)
      </button>
    </div>
  );
};

export default Splash;
