import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../store/auth"; //useAuth ko import krke hm kahi per v token ko generate kar sakte hia.
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  // To save token in local storage

  const { storeTokenInLS } = useAuth(); // {} ke under import kr rhe hia bcz default export nhi kar rhe hai

  // HANDLING INPUT
  function handleInput(e) {
    /*console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    */

    let name = e.target.name; // kis input field ko target kiya hai
    let value = e.target.value; //vlaue jisko target kiya hai uska

    setUser({
      ...user,

      [name]: value,
    });
  }

  // Handling the form submission:-----------
  const handleSubmit = async (e) => {
    e.preventDefault(); //to stop reload

    // Insert data into database
    try {
      // fetch return promises
      // const response = await fetch("http://localhost:3000/api/auth/register", {
      const response = await fetch(
        "https://gauravmymern1.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const res_data = await response.json();
      console.log("Response from server -> ", res_data); //error-middelware.js file se
      console.log("Response from server, message is  -> ", res_data.message);
      console.log(
        "Response from server, extradetails is  -> ",
        res_data.extraDetails
      );

      console.log("MyReSPONECE is ", response);

      //
      if (response.ok) {
        storeTokenInLS(res_data.token);
        console.log("Resresaljlkdjalgsj TOKEN", res_data.token);

        setUser({ username: "", email: "", mobile: "", password: "" });

        toast.success("Registration successful");
        // navigate("/login");
        navigate("/"); //navigate to homepage
      } else {
        // alert("Not a valid registraction");
        // alert(res_data.extraDetails);
        // Agar extraDetails mile to extraDetails show kro otherwise error wala message show karo

        // alert(res_data.message);

        // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }

      console.log(response);
    } catch (error) {
      console.log("Register ", error);
    }

    // Jb CORS ka error de to iska mtlb ki hmara frontEnd successfully connect ho gya hai database se.
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500"
                />
              </div>

              {/* Registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  {/* form ke submit per reload band */}
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="enter username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username} // useState() se user ka username ko access kro, i.e. uska value aa jaye
                      onChange={handleInput} // koi value v input kre do wo input hona chahiye
                    />
                  </div>
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
                    <label htmlFor="mobile">mobile</label>
                    <input
                      type="phone"
                      name="mobile"
                      placeholder="enter mobile number"
                      id="mobile"
                      required
                      autoComplete="off"
                      value={user.mobile}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="create password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
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
