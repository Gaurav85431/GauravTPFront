import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function AdminContacts() {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();
  //

  const getContactData = async () => {
    try {
      console.log("my cont ctoken is ", authorizationToken);
      // const response = await fetch("http://localhost:3000/api/admin/contacts", {
      const response = await fetch(
        "https://gauravmymern1.onrender.com/api/admin/contacts",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken, //token to dena hi hai i.e. Bearer Token
          },
        }
      );

      const data = await response.json(); //is data ko hme map()ka use krke show krna hai.
      console.log("contact data is ", data);
      console.log(response.ok, " is = response.ok");
      if (response.ok) {
        setContactData(data); //setContactData me current data me empty array na hoke, data ka array aata hia.
      }
    } catch (error) {
      console.log(error);
    }
  };

  // define the function deleteContactById which will delete the contact i.e. message etc. from contact collection
  const deleteContactById = async (id) => {
    try {
      // const response = await fetch(
      //   `http://localhost:3000/api/admin/contacts/delete/${id}`,
      //   {
      const response = await fetch(
        `https://gauravmymern1.onrender.com/api/admin/contacts/delete/${id}`,
        {
          method: "delete",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      // agar delete ho jata hai to hme getContactData()(Jo ki useEffect()me call hai.) ko call krna hoga taki wapas hm sare contact ko fetch kr saken
      if (response.ok) {
        toast.success("Deleted successfully");
        getContactData();
      } else {
        toast.error("fail to delete");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getContactData();
  }, []);

  //
  return (
    <>
      {/* {ContactData.map()} */}
      {/* <h1>Hello from server</h1>
      {contactData.map((curContactData, index) => {
        return <p key={index}>{curContactData.username}</p>;
      })} */}

      <section className="admin-contacts-section">
        <h1>Admin contact data</h1>

        <div className="container admin-users">
          {contactData.map((curContactData, index) => {
            // const { username, email, message } = curContactData;
            const { username, email, message, _id } = curContactData; //db ke contact ke collection me _id hai usko hi destructuring kr rha hu.

            return (
              <>
                <div key={index}>
                  <p>Name: {username}</p>
                  <p>Email: {email}</p>
                  <p>Message: {message}</p>
                  <button
                    className="btn"
                    onClick={() => deleteContactById(_id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default AdminContacts;
