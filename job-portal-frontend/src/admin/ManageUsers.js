import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./ManageUsers.css";

function ManageUsers() {

  const [users,setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://smartjobportal-production-25fb.up.railway.app/api/users"
    );

    setUsers(res.data);
  };

  const deleteUser = async(id) => {

    if(!window.confirm("Delete this user?")){
      return;
    }

    await axios.delete(
      `https://smartjobportal-production-25fb.up.railway.app/api/users/${id}`
    );

    fetchUsers();
  };

  return (
    <div className="admin-container">

      <AdminSidebar />

      <div className="admin-content">

        <div className="page-container">

          <h1 className="page-title">
            Manage Users
          </h1>

          <div className="table-container">

            <table className="user-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>College</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      <span
                        className={
                          user.role === "ADMIN"
                          ? "role-admin"
                          : "role-user"
                        }
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>{user.college}</td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManageUsers;