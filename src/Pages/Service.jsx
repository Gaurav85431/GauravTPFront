import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services.map((currElmt, index) => {
          const { price, description, service, provider } = currElmt;

          // agar hm desturctur nhi krte hme likhna padta <h2>{currElmt.provider } </h2>. TO overcomet this problem we have used obect destructuring.

          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="our services information"
                  width="500"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description} </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
