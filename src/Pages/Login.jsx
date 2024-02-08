import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../store/auth"; //useAuth ko import krke hm kahi per v token ko generate kar sakte hia.
import { toast } from "react-toastify";
// hme alert() ke badle toast() ko use karna hia aur hme <ToastContaner /> ko main appliation (main.jsx) me rakhna hia taki koi v component ya pages usko access kar saken.

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // To store token in local storage. Since ye default export nhi hai to hm iskoo {} ke under use kiye hai.
  const { storeTokenInLS } = useAuth();

  // what ever input user is provide

  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const URL = "http://localhost:3000/api/auth/login";

  //form ke click per not reload
  const handleSubmit = async (e) => {
    e.preventDefault(); // to stop reload

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), //object ko json me convert kr rhe hai.
      });

      const res_data = await response.json();

      if (response.ok) {
        // alert("Login successful");
        // toast("Login successful");
        toast.success("Login successful");

        // useAuth se storeTokenInLS liye, ab storeTokenInLS me hm token ko paas krenge
        storeTokenInLS(res_data.token);

        setUser({ email: "", password: "" }); //after login reset value in textfield
        navigate("/"); //navigate to home
      } else {
        // alert(res_data.message);

        // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Login error is ", error);
    }
  };

  return (
    <>
      {/*  */}

      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="a girl is trying to do login"
                  width="500"
                  height="500"
                />
              </div>

              {/* Login form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  {/* form ke submit per reload band */}
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
