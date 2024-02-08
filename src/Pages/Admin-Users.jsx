import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const { authorizationToken } = useAuth();
  // authorizationToken me hmara Bearer+Token value hai, ye wahi value hai jisko ki hme paas karna hai adminRoute me taki hm users ki data ko get kar saken.

  const getAllUsersData = async () => {
    try {
      console.log("User TOken hai", authorizationToken);
      const response = await fetch("http://localhost:3000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      // console.log("My res ==", response);

      const data = await response.json();
      // Ye jo hme data  mila hai hme  usko kahin per store kara lenge taki kahin per hm isko store kara saken aur hm isper loop chala saken. Iske liye hm state variable ka use karenge.
      setUsers(data);
      // yani ki ab hmare paas user me data chala jayega. i.e. setUsers(data) se data aa jayega user me.

      console.log(`Users data is ${data}`);
    } catch (error) {
      console.log(error);
    }
  };

  // delete the user on click button
  const deleteUser = async (id) => {
    //deleteUser me hm 1 argument ko pass kiye hia i.e. id
    console.log("delete", id);

    console.log("wwwww");
    const response = await fetch(
      `http://localhost:3000/api/admin/users/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken, // taki hm check kr saken ki jo hmne auth middleware lagayen hai wo checkout kar saken ki isne login ki hai ya nahi.
        },
      }
    );
    // console.log("Response is ", response);
    // console.log("Response.ok is ", response.ok);
    const data = await response.json();
    console.log(`User after delete ${data}`);

    // // hm chahte hia ki delete karna ke baad without page refresh ke screen per wo show ho to hm uske liye hm getAllUsersData() method ko response.ok me call karenge taaki. 1st time jb page load ho tab chalega, 2nd time jb data delete ho tab chalega.

    if (response.ok) {
      getAllUsersData();
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currUser, index) => {
                return (
                  // JB v hm map() ka use karte hai to hme key use karna padta hia.
                  <tr key={index}>
                    <td>{currUser.username}</td>
                    <td>{currUser.email}</td>
                    <td>{currUser.mobile}</td>

                    {/* ye edit wala 1 link hoga ki jaise hi hm isper click kren to hm dusre page per chale jayenge jahan per hme updateUser ka option mile. To iske liye hm navlink na use kar ke link ko use karenge. */}
                    <td>
                      <Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                    </td>

                    {/* delete user me hm pass karenge current id of user jise delete krna chahte hia. */}
                    <td>
                      <button onClick={() => deleteUser(currUser._id)}>
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default AdminUsers;
