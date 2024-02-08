import Analytics from "../Component/Analytics";
import { useState } from "react";

import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="section-hero">
        {/* my div text and images */}
        <div className="container grid grid-two-cols">
          {/* Content div */}
          <div className="hero-content">
            {/* <p>Welcome Gaurav Pushpam</p> */}
            <p>
              Welcome ,{" "}
              {user
                ? ` ${user.userData.username} to our website`
                : `to our website`}
            </p>
            {/* we r checking ki agar user me data hai to name ke sath print kro otherwise without name ke saath print karo */}

            <h1>Why Choose Us?</h1>
            <p>
              Choose us for software development because we turn your ideas into
              powerful, scalable solutions that exceed expectations. We're not
              just developers; we're innovators. Choose us to bring cutting-edge
              technology and creativity to your software projects. Our
              commitment to excellence sets us apart. Choose us for software
              development that combines skill, passion, and precision. In a
              world of code, we speak the language of innovation. Choose us to
              transform your concepts into exceptional software experiences.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">Learn more</button>
              </a>
            </div>
          </div>

          {/* hero content */}

          <div className="hero-image">
            {/* reactJS me hme minimum width and height dena hi hota hia. */}
            <img
              src="/images/about.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>
        </div>
      </section>

      {/* 2nd section */}
      <Analytics />
    </>
  );
};
