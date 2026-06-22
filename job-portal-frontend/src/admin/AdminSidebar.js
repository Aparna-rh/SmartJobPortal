import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {

  const location = useLocation();

  return (
    <div className="admin-sidebar">

      <div className="sidebar-header">
        <h2>Smart Job Portal</h2>
        <p>Admin Panel</p>
      </div>

      <nav>

        <Link
          to="/admin"
          className={
            location.pathname === "/admin"
              ? "active-link"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/admin/applications"
          className={
            location.pathname === "/admin/applications"
              ? "active-link"
              : ""
          }
        >
          Applications
        </Link>

        <Link
          to="/admin/jobs"
          className={
            location.pathname === "/admin/jobs"
              ? "active-link"
              : ""
          }
        >
          Jobs
        </Link>

        <Link
          to="/admin/users"
          className={
            location.pathname === "/admin/users"
              ? "active-link"
              : ""
          }
        >
          Users
        </Link>

      </nav>

    </div>
  );
}

export default AdminSidebar;