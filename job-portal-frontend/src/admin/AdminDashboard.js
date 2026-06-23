// AdminDashboard.js

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    users: 0,
    jobs: 0,
    applications: 0,
    interviews: 0,
    offers: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://smartjobportal-production-25fb.up.railway.app/api/admin/dashboard"
      );

      setData(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const chartData = [
    { name: "Users", value: data.users },
    { name: "Jobs", value: data.jobs },
    { name: "Applications", value: data.applications },
    { name: "Interviews", value: data.interviews },
    { name: "Offers", value: data.offers }
  ];

  return (
    <div className="admin-container">

      <AdminSidebar />

      <div className="admin-content">

        <h1 className="admin-title">
          Dashboard
        </h1>

        {/* Statistics */}

        <div className="stats-grid">

          <div
            className="stat-card users"
            onClick={() => navigate("/admin/users")}
          >
            <h2>{data.users}</h2>
            <p>Total Users</p>
          </div>

          <div
            className="stat-card jobs"
            onClick={() => navigate("/admin/jobs")}
          >
            <h2>{data.jobs}</h2>
            <p>Total Jobs</p>
          </div>

          <div
            className="stat-card applications"
            onClick={() => navigate("/admin/applications")}
          >
            <h2>{data.applications}</h2>
            <p>Applications</p>
          </div>

          <div
            className="stat-card interviews"
            onClick={() => navigate("/admin/applications")}
          >
            <h2>{data.interviews}</h2>
            <p>Interviews</p>
          </div>

          <div
            className="stat-card offers"
            onClick={() => navigate("/admin/applications")}
          >
            <h2>{data.offers}</h2>
            <p>Offers</p>
          </div>

        </div>

        {/* Analytics */}

        <div className="chart-box">

          <h2>Analytics Overview</h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* System Overview */}

        <div className="activity-box">

          <h2>System Overview</h2>

          <div className="activity-item">
            Registered Users : {data.users}
          </div>

          <div className="activity-item">
            Jobs Available : {data.jobs}
          </div>

          <div className="activity-item">
            Applications Submitted : {data.applications}
          </div>

          <div className="activity-item">
            Interviews Scheduled : {data.interviews}
          </div>

          <div className="activity-item">
            Offers Released : {data.offers}
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;