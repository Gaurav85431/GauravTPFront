import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../store/auth";

function Logout() {
  const { LogoutUser } = useAuth(); //useAuth() se LogoutUser ko le liyaa

  // jb v koi Logout button pr click krega to LogoutUser() wla function chalgea. aur hmara token remove ho jayega.

  useEffect(() => {
    //useEffect hai to ye first time chalega.
    LogoutUser();
  }, [LogoutUser]);

  // IF logout ho jaye to login page per redirect ho jaye
  return <Navigate to="/Login" />;
}

export default Logout;
