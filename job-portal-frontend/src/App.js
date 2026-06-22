import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchJobs from "./pages/SearchJobs";
import Internships from "./pages/Internships";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import ApplyJob from "./pages/ApplyJob";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import ManageApplications from "./admin/ManageApplications";
import ManageJobs from "./admin/ManageJobs";
import ManageUsers from "./admin/ManageUsers";
import AdminRoute from "./admin/AdminRoute";
import Notifications from "./pages/Notifications";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Pages */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />

              <div style={{ display: "flex" }}>

                <Sidebar />

                <div
                  style={{
                    flex: 1,
                    padding: "20px",
                    background: "#f4f7fc",
                    minHeight: "100vh"
                  }}
                >

                  <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route
                      path="/dashboard"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/search-jobs"
                      element={<SearchJobs />}
                    />

                    <Route
                      path="/apply/:id"
                      element={<ApplyJob />}
                    />

<Route
   path="/notifications"
   element={<Notifications />}
/>

                    <Route
                      path="/internships"
                      element={<Internships />}
                    />

                    <Route
                      path="/my-applications"
                      element={<MyApplications />}
                    />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/users" element={<ManageUsers />} />
<Route path="/admin/jobs" element={<ManageJobs />} />
<Route path="/admin/applications" element={<ManageApplications />} />
                    <Route
                      path="/profile"
                      element={<Profile />}
                    />

                  </Routes>

                </div>

              </div>
            </>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <ManageApplications />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <ManageJobs />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;