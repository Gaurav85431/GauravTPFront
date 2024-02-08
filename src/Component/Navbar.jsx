import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

// export taki app.jsx me use kar saken
export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="log-brand">
            <NavLink to="/">Gaurav Logo</NavLink>
          </div>

          {/* Nav bar */}
          <nav>
            <ul>
              <li>
                {/* 
                  The <Link> and <NavLink> are the components for anchor tags replacement provided by react-router-dom to navigate around the react application. Generally, we use anchor tags for this purpose while navigating.

                  Anchor tags will reload the page and re-render all the components. While <Link> and <NavLink> will only re-render updated components matched with the URL path of the Route without reloading. It helps the Single-Page Applications to work faster while routing.


                */}
                {/* <a href="/">Home</a> */}
                <NavLink to="/">Home</NavLink>

                {/* 
                
                  <Link> Component Props:
                      to: String or object that specifies the pathname.
                      replace: Replaces the pathname in the history stack with new.
                      innerRef: Passes ref to the element rendered by the component.

                */}
              </li>
              <li>
                {/* Jo routes App.jsx me likha hai wahi path i.e. /about */}
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/service">Service</NavLink>
              </li>

              {/* we apply condition ki user login hai to logout show otherwise register and login button show */}
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>

                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
