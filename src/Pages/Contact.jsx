import { useState } from "react";

import { useAuth } from "../store/auth";

import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const { user } = useAuth(); // hm useAuth se user ko nikal rhe hai. user me sara data hai User ka.

  // hme user ka name chahiye username wala input field ke value me to hm iske liye 1 aur state variabel ko create kareage.
  const [userData, setUserData] = useState(true); //Isme hm true hi paas karengee.

  // console.log("user mail is ", user.userData);

  // @@@@@@****************/^^^^^^^^$$$$$$$$%$#%%%%%%%#$^#&&$
  if (userData && user) {
    // ydi user ki value true hai, userData ko to hm true de hi rhe hia. to hm setContact me username ko by default de denge es user ka username, es user ka email ko v by default de denge. Lekin hm message me empty de denge bcz ki hme kiya pta ki user kiya msg likhne wala hai.

    setContact({
      username: user.userData.username,
      email: user.userData.email,
      message: "",
    });

    setUserData(false); // hmne to value ko update kar de so hm ab isme false de denge.

    // Agar koi v apna data value ko fill kar rha hia to hm usko to update to kar hi rhe hai handleInput()  ke under (see niche 10 iine yaaha se)
  }

  // what ever input user is provide

  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;

    /* setContact({
      ...contact,
      [name]: value,
    });*/

    // Ya

    setContact((prev) => ({
      //previous data
      ...prev,
      [name]: value,
    }));
  }

  //form ke click per not reload
  const handleSubmit = async (e) => {
    e.preventDefault(); // to stop reload

    // Save data to the database::-

    try {
      // const response = await fetch("http://localhost:3000/api/form/contact", {
      const response = await fetch(
        "https://gauravmymern1.onrender.com/api/form/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact), // hmara data object ke form me hia to hm usko convert karenge JSON me by Stringify. chuki sb data contact ke under hai isliye hm user ko v pass kiye.
        }
      );
      console.log("respnc", response);
      console.log("response", response.ok);

      const data = await response.json();

      // console.log("ccontact response ", response);
      if (response.ok) {
        // ab hm data ko clear kr denge form se bcz wo data insert ho gya hai.
        setContact(defaultContactFormData);
        //
        // const data = await response.json();
        // console.log(data);

        // alert("Message send successfully");
        toast.success("Message send successfully");
        // toast.success(data.message);
      } else {
        // toast.error(
        //   "Message must be of minimum 10 characters or check your mail id"
        // );
        // console.log("MSG from contact;;", data.extraDetails);
        toast.error(data.extraDetails);
      }
    } catch (error) {
      // alert("Message not send");
      // toast.error("Message not send");

      console.log(error);
    }
  };

  return (
    <>
      {/*  */}

      <section>
        <main>
          <div className="section-contact">
            <div className="contact-content container">
              <h1 className="main-heading">Contact Us</h1> <br />
            </div>
            <div className="container grid grid-two-cols">
              <div className="contact-img">
                {/* Files in the public directory are served at the root path.
Instead of /public/images/support.png, use /images/support.png */}
                <img
                  src="/images/support.png"
                  alt="for help contact us"
                  width="400"
                  height="400"
                />
              </div>
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
                      value={contact.username} // useState() se user ka username ko access kro, i.e. uska value aa jaye
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
                      value={contact.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Message </label>
                    <textarea
                      name="message"
                      placeholder="enter message"
                      id="message"
                      rows="10"
                      cols="30"
                      required
                      autoComplete="off"
                      value={contact.message} // useState() se user ka username ko access kro, i.e. uska value aa jaye
                      onChange={handleInput} // koi value v input kre do wo input hona chahiye
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* map */}

        {/* allowfullscreen ke bdle REACTJS me camel case me likhe i.e. allowFullScreen */}
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57485.50093991523!2d87.47911514999998!3d25.775722100000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff97656feec5f%3A0xc57dda35d9a83807!2sPurnia%2C%20Bihar!5e0!3m2!1sen!2sin!4v1706979211501!5m2!1sen!2sin"
            width="1480"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
