import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const userId = localStorage.getItem("userId");

      console.log("User ID =", userId);

      if (!userId) {
        alert("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `https://smartjobportal-production-25fb.up.railway.app/api/notifications/${userId}`
      );

      console.log("Notifications =", res.data);

      setNotifications(res.data);

    } catch (err) {

      console.error("Notification Error:", err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f7fa",
        minHeight: "100vh"
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#1e293b"
        }}
      >
        Notifications
      </h2>

      {loading ? (

        <p>Loading...</p>

      ) : notifications.length === 0 ? (

        <p>No notifications available.</p>

      ) : (

        notifications.map((item) => (

          <div
            key={item.id}
            style={{
              background: "#ffffff",
              padding: "16px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              borderLeft: "5px solid #2563eb"
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: "500"
              }}
            >
              {item.message}
            </p>

            <small
              style={{
                color: "#64748b"
              }}
            >
              {item.createdAt}
            </small>
          </div>

        ))

      )}
    </div>
  );
}

export default Notifications;