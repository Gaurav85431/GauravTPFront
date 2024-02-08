import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// is function ke through hm is function ke through data ko paas kar rhe hai. Ye Provider ka kaam rha hia.

// Is AuthProvider function me hi hm function ya jo v hai usko define karna hia, aur as a value props hota hai uske through hme data pass krna hai.
// PROVIDER
export const AuthProvider = ({ children }) => {
  // hm 1 state variable banayenge jisme ki hm state variable ko get kar rhe honge.

  const [token, setToken] = useState(localStorage.getItem("token"));

  // user ka state variable
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);

  const [isLoading, setIsLoding] = useState("true"); // mera page avi load kr rha hia, content mat show kro normal user ko admin ka

  const authorizationToken = `Bearer ${token}`;

  // console.log("Token from auth.jsx after login", authorizationToken);

  const storeTokenInLS = (serverToken) => {
    // jb hm login krte hai to local storage me add krne se pehle hme state variable i.e. token me usko add krna hia. BCZ token per hi hmara isLoggedIn value dependent hai. i.e. iski value false hai to hmne login and registration show hoga.        aur iski value false hia to hme sirf login show hoga.

    setToken(serverToken);

    // localStorage pr to token rahega hi, hm us se pehle token ko pass kar diya setToken() me.

    return localStorage.setItem("token", serverToken); // LS me token dena.
  };

  /** */
  // token ka value aayega jb hm localstorage se token ko get kar rhe hai

  let isLoggedIn = !!token; //yadi token ki value rha to true, agar nhi rha  to false

  /*** */

  // LOGOUT
  const LogoutUser = () => {
    // Logout ke liye hm-
    // 1st setToken() ki value ko null kar denge.
    // 2nd ki hm LocalStorage wala token ko v remove kar denge
    setToken("");
    return localStorage.removeItem("token");
  };

  // ------------------------------
  // JWT AUTHENTICATION:::::---- tO GET currently logged in user data
  // ------------------------------

  const userAuthentication = async () => {
    try {
      // token check krne se pehle hi hme check krna hai ki mera setIsLoading true hai to it means ki page load ho rha hia content mat show kro normal user kao

      setIsLoding(true);
      // token ko match kra kr dekene se pehle hi setIsLoading(true) kr denge. current user ke data fetch krne se pehle hi hm setIsLoading(true) ko  chala dnege.

      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: authorizationToken,
        },
      });

      // agar hme data mil rha hai.

      // console.log("res : ", response);
      if (response.ok) {
        const data = await response.json(); //bcz json format me data ata hai.
        // ab hm ye data ko ek state variable ko pass  karenge i.e. setUser;
        // console.log("user data is ", data);
        console.log("user data is ", data.userData);
        setUser(data);

        //hm ye <AuthContent.Provider> k value me data ko paas kar denge.

        // jb token se data mila to hm setIsLoading ko false kr denge. To isse ye hoga ki jb tk data nhi mil jata hai tb tk loading state pr rho. Jb data mil gaya to hm loading state ko hata denge. Isse ye hoga ki jb tk data nhi milta tb tk page load nhi hoga.
        setIsLoding(false);
        /**** */
      } else {
        console.log("Error fetching the user data");

        // agar response proper na aaye but atleast error wala response to hme milega.
        setIsLoding(false);
      }
    } catch (error) {
      console.log("Error fetching user data");
    }
  };

  // --------------
  // Services = to fetch service data from data base.
  // --------------
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json(); // data JSON me hai to hme usko conver krke object ke form me chahiye to hm usko change kar diye.
        console.log("data is ", data);
        console.log("data message is ", data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`Services frontend error ${error}`);
    }
  };

  useEffect(() => {
    getServices(); // jaise ki hmne user ko call kiya thha, 1 state variable me data likh kar paas kar diya, jisko v user ka data chahiye wo easily call kr ke get kar lega. To hm same logic service ka v lagayenge.
    userAuthentication();
  }, []);

  ////////////

  return (
    // Hum jante hia ki CONTEXT API ME KISI KO KAHIN PER V DEFINE KARTE HIA TO USKO HM USE KAHIN PR USE KAR SAKTE HIA, AGAR USKO HM USKO PROVIDER KE VALUE KE UNDER PAAS KAR DE.  like we pass authorizationToken

    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  // AuthProvider se hme main application ko wrap karna hia.i.e. AuthProvider se hme hmare main.jsx ko wrap krna hia.
};

//delivery  Ya // CONSUMER

// we will create custom hook
export const useAuth = () => {
  //return useContext(AuthContext); //isme sara data aa gya hai, isko koi v use kar sakta hia.

  // 1 common mistake hota hia ki Provier ko main.jsx me  wrap hi nhi karta hai. Iske liye hm 1 condition de  denge.

  const authContextValue = useContext(AuthContext);

  // agar not use
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  // else
  return authContextValue;
};
