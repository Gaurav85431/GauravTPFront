import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// hme alert() ke badle toast() ko use karna hia aur hme <ToastContaner /> ko main appliation (main.jsx) me rakhna hia taki koi v component ya pages usko access kar saken. Hmne css file ko v import kiya chuki hme aacha dekhe, otherwise vaddda dikh rha thaa.

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
      />
      <App />
    </React.StrictMode>
  </AuthProvider>
);
