import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Service } from "./Pages/Service";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Navbar } from "./Component/Navbar";
import { Footer } from "./Component/Footer";
import Error from "./Pages/Error";
import Logout from "./Pages/Logout";
import { AdminLayout } from "./Component/layouts/Admin-Layout.";
import AdminUsers from "./Pages/Admin-Users";
import AdminContacts from "./Pages/Admin-Contacts";
import AdminUpdate from "./Pages/Admin-Update";

// Agar hm chahe to svi pages(like home, about...) per navbar ko import krke use kr skte hia, lekin usse ye problem hoga ki bar bar page refresh hoga. To hmare react application ko reload nhi karna hia to hm Main file i.e. App.jsx me hi Navbar ko use kar liye.

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* '*' if no any match  */}
          <Route path="*" element={<Error />} />

          {/* Nested Routes for Admin like /admin/users etc. */}

          <Route path="/admin" element={<AdminLayout />}>
            {/* ye hmara admin actually ye hoga-> /admin==> /admin/ i.e. khud se hi / lag jayega.*/}

            <Route path="users" element={<AdminUsers />} />
            {/* Nested routes ko tackle krne ke liye we have outlet. OUTLET ka kam hota hia jo v nested routes hai usko show karne ka kam krta hia. */}
            <Route path="contacts" element={<AdminContacts />} />

            {/* /:id/ because ki hmne server pr yahi diya thha */}
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>

        {/* give footer at bottom side */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
