import React from "react";
import { NavLink } from "react-router-dom";

function Error() {
  return (
    <section id="error-page">
      <div className="content">
        <h3>Sorry! Page not found</h3>
        <p>
          Oops! It seems like the you're trying to access doesn't exists. If you
          believe there's an issue, feel free to report it, and we'll look into
          it.
        </p>

        <div className="contact-img">
          <img
            src="/images/error.webp"
            alt="for help contact us"
            width="480"
            height="400"
          />
        </div>

        <div className="btns">
          <NavLink to="/">Return Home</NavLink> <br />
          <NavLink to="/contact">Repeat Problem</NavLink>
        </div>
      </div>
    </section>
  );
}

export default Error;
