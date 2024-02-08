import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth(); // isko hm hmare context api se get kar rhe hia.

  console.log("Usre in Admin layout ", user); //isse sara data of user come. Hme need ki user admin hai ya nhi i.e. value of isAdmin

  // agr wo usser admin nhi hai to wo navigate ho jayega homepagae per.

  // hm pehle ye check krenge ki hmara isLoading wala value jb tk true hogi tb tk kuch mt kro i.e. 1 loading show kr do

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  // Once iski value hogi false hogi, i.e. ye false tb hogi jb hmra data jo hai wo hmara user wala state variable me add kr chuke honge. Uske baad hm ye condition ko check krenge is wo user admin hia ya nhi.

  // REACT ME SIRF 1 HI BAR RETURN KAR SAKTE HIA.

  // jb 1st time page load to / pr i.e. homepage pr navigate kr jayega.
  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              {/* NavLink ka use krenge taki koi sa page pr  redirect ho jaye */}
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaRegListAlt /> services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/home">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
