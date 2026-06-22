import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import "./ManageJobs.css";

function ManageJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    const res = await axios.get(
      "http://localhost:8080/api/jobs"
    );

    setJobs(res.data);
  };

  const deleteJob = async(id) => {

    if(!window.confirm("Delete this job?")){
      return;
    }

    await axios.delete(
      `http://localhost:8080/api/jobs/${id}`
    );

    fetchJobs();
  };

  return (

    <div className="admin-container">

      <AdminSidebar />

      <div className="admin-content">

        <div className="page-container">

          <h1 className="page-title">
            Manage Jobs
          </h1>

          <div className="table-container">

            <table className="job-table">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr key={job.id}>

                    <td>{job.id}</td>

                    <td>{job.title}</td>

                    <td>{job.company}</td>

                    <td>{job.location}</td>

                    <td>
                      <span className="salary-badge">
                        {job.salary}
                      </span>
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteJob(job.id)
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

export default ManageJobs;