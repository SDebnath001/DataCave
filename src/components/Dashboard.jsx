import React, { useEffect, useState } from "react";
import NavDashboard from "./NavDashboard";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const logOut = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages`, {
          params: {
            userId: user.uid,
            email: user.email,
          },
        });

        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => logOut();
  }, [navigate]);

  return (
    <>
      <NavDashboard />
      <div className="dashboard-content">
        <div className="content-area">
          <div className="left p-2">
            <div className="menu-btn">
              <h3 className="text-center">Today</h3>
              <p className="text-center mt-3">{new Date().toLocaleString()}</p>
            </div>
            <div className="menu-btn active">
              <h6 className="text-center">DASHBOARD</h6>
            </div>
            <div className="menu-btn">
              <h6 className="text-center">ANALYSIS</h6>
            </div>
            <div className="menu-btn">
              <h6 className="text-center">TASKS</h6>
            </div>
            <div className="menu-btn">
              <h6 className="text-center">SETTINGS</h6>
            </div>
            <div className="menu-btn">
              <h6 className="text-center">HELP</h6>
            </div>
          </div>
          <div className="right p-2">
            <h3 className="text-center bg-warning-subtle rounded-3 py-2">Data and Messages</h3>
            <div className="mt-5 data-area">
              {loading ? (
                <p className="text-center">Please wait a bit. Server is Loading your messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-center">No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="card bg-success-subtle mb-3">
                    <div className="card-header">
                      <strong>{msg.name}</strong>
                    </div>

                    <div className="card-body">
                      <div className="card-title d-flex gap-2">
                        <h6>Email :</h6>
                        <span>{msg.email}</span>
                      </div>

                      <div className="card-text mt-3">
                        <h6>Message from user :</h6>
                        <span>{msg.message}</span>
                      </div>

                      <small className="text-muted">
                        {new Date(msg.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
