import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./ManageApplications.css";

function ManageApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/applications"
      );

      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete application?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/applications/${id}`
      );

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/applications/${id}/${status}`
      );

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Shortlisted":
        return "status-shortlisted";

      case "Interview":
        return "status-interview";

      case "Accepted":
        return "status-selected";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-pending";
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-content">
        <div className="page-container">
          <h1 className="page-title">
            Manage Applications
          </h1>

          <div className="table-container">
            <table className="application-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Applicant</th>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>

                    <td>{app.userName}</td>

                    <td>{app.jobTitle}</td>

                    <td>{app.company}</td>

                    <td>
                      <span
                        className={getStatusClass(app.status)}
                      >
                        {app.status || "Pending"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="action-btn shortlist"
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "Shortlisted"
                            )
                          }
                        >
                          📋 Shortlist
                        </button>

                        <button
                          className="action-btn interview"
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "Interview"
                            )
                          }
                        >
                          🎤 Interview
                        </button>

                        <button
                          className="action-btn selected"
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "Accepted"
                            )
                          }
                        >
                          ✅ Select
                        </button>

                        <button
                          className="action-btn rejected"
                          onClick={() =>
                            updateStatus(
                              app.id,
                              "Rejected"
                            )
                          }
                        >
                          ❌ Reject
                        </button>

                        <button
                          className="action-btn delete"
                          onClick={() =>
                            deleteApplication(app.id)
                          }
                        >
                          🗑 Delete
                        </button>

                      </div>
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

export default ManageApplications;