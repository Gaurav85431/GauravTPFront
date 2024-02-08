import Analytics from "../Component/Analytics";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          {/* my div text and images */}
          <div className="container grid grid-two-cols">
            {/* Content div */}
            <div className="hero-content">
              <p>We are world Best It company</p>
              <h1>Welcome to Gaurav Website</h1>
              <p>
                If you had to identify, in one word, the reason why the human
                race has not achieved, and never will achieve, its full
                potential, that word would be 'meetings.
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
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section */}
      {/* ye Home.jsx aur About.jsx me common hai to hm iskoo 1 component me rakh denge aur usko hm yahan per use kar lenge. */}
      <Analytics />
      {/* 3rd section */}

      <section className="section-hero">
        {/* my div text and images */}
        <div className="container grid grid-two-cols">
          <div className="hero-image">
            {/* reactJS me hme minimum width and height dena hi hota hia. */}
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          {/* Content div */}
          <div className="hero-content">
            <p>We are here to help you</p>
            <h1>Get start today</h1>
            <p>
              Your journey to success begins with the decision to learn. Every
              great journey begins with a single step. Take that step towards
              your future by joining our community.
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
        </div>
      </section>
    </>
  );
};
