import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AdminUpdate() {
  const [data, setData] = useState({
    username: "",
    email: "",
    mobile: "",
  });

  //

  const { authorizationToken } = useAuth();

  const params = useParams();

  // get the single user data
  const getSingleUserData = async () => {
    try {
      // id hme url se aa jayega jaise hi koi sa button pr click krega to usse related url i.e. having userID sb aa jayega.

      // const response = await fetch(
      //   `http://localhost:3000/api/admin/users/${params.id}`,
      //   {
      const response = await fetch(
        `https://gauravmymern1.onrender.com/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      console.log("Params single user ", params.id);
      // console.log("Response is ", response);
      // console.log("response.ok is", response.ok);
      const data = await response.json();
      console.log(`User single data  ${data}`);

      // hme jo v data milega usko setData me set karana hoga.

      setData(data); // is se ye hoga ki joo v hme user ka data aa rha hia usko hmne setData ke under add kar di, to hmara data update ho chuka hai. Jb wo update ho gya hai to hm data.name, data.email, data.mobile ko access kar sakta haun.

      // if (response.ok) {
      //   getAllUsersData();
      // }
    } catch (error) {
      console.log("upadte error ", error);
    }
  };

  //
  useEffect(() => {
    getSingleUserData();
  }, []); // yahan per hme array dependency lagegi.

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // To update the data dynamically

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch(
      //   `http://localhost:3000/api/admin/users/update/${params.id}`,
      //   {
      const response = await fetch(
        `https://gauravmymern1.onrender.com/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", //jb v hm json me data paas kr rhe hai to hme batana padega, ki mere header per 1 file share kar rha hun jiska content type hoga json bolke.

            // "Content-Type": "application/json",  => ye hme Post and patch me lgta hai

            Authorization: authorizationToken,
          },
          body: JSON.stringify(data), //our data is in JSON=> to hm useState k object ko json me convert karenge.
        }
      );

      console.log("my resp is ", response);
      console.log("my resp.ok is ", response.ok);
      if (response.ok) {
        toast.success("Update successfully");
      } else {
        toast.error("Update Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data </h1> <br />
        </div>
        <div className="container grid grid-two-cols">
          {/* contact form */}
          <div className="section-form">
            <br />

            <form onSubmit={handleSubmit}>
              {/* form ke submit per reload band */}

              <div>
                <label htmlFor="username">Username </label>
                <input
                  type="text"
                  name="username"
                  placeholder="enter username"
                  id="username"
                  required
                  autoComplete="off"
                  value={data.username} // useState() se user ka username ko access kro, i.e. uska value aa jaye
                  onChange={handleInput} // koi value v input kre do wo input hona chahiye
                />
              </div>

              <div>
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  id="email"
                  required
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="mobile">Mobile </label>
                <input
                  name="mobile"
                  placeholder="enter mobile"
                  id="mobile"
                  rows="10"
                  cols="30"
                  required
                  autoComplete="off"
                  value={data.mobile} // useState() se user ka username ko access kro, i.e. uska value aa jaye
                  onChange={handleInput} // koi value v input kre do wo input hona chahiye
                />
              </div>

              <br />
              <button type="submit" className="btn btn-submit">
                Update data
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUpdate;
