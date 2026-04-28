import React, { useEffect, useState } from "react";
import NavDashboard from "./NavDashboard";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DateLayout from "./DateLayout";

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
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/messages`,
          {
            params: {
              userId: user.uid,
              email: user.email,
            },
          },
        );

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
            <div className="">
              <div className="menu-btn active">
                <h6>DASHBOARD</h6>
              </div>
              <div className="menu-btn">
                <h6>PASSWORDS</h6>
              </div>
              <div className="menu-btn">
                <h6>ANALYSIS</h6>
              </div>
              <div className="menu-btn">
                <h6>TASKS</h6>
              </div>
              <div className="menu-btn">
                <h6>HELP</h6>
              </div>
            </div>
            <div className="profile-btns my-lg-5">
              <div>
                <i className="bi bi-person-circle"></i>
              </div>
              <div>
                <i className="bi bi-gear-fill"></i>
              </div>
            </div>
          </div>
          <div className="right">
            <DateLayout />
            <div className="mt-5 data-area">
              {loading ? (
                <p className="text-center">
                  Please wait a bit. Server is Loading your messages...
                </p>
              ) : messages.length === 0 ? (
                <p className="text-center">No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="card message-cards">
                    <div className="message-card-head">
                      <strong>{msg.name}</strong>
                      <div className="d-flex gap-2 checkboxInput">
                        <label className="form-check-label">Read</label>
                        <input
                          type="checkbox"
                          name="read"
                          id="MarkRead"
                          className="form-check-input"
                        />
                      </div>
                    </div>
                    <div className="card-message-body">
                      <div className="message-email-id">{msg.email}</div>

                      <div className="card-text mt-3 mb-3">
                        <h6 className="userMsg">User Message:</h6>
                        <div className="Umessage">{msg.message}</div>
                      </div>
                      <small className="text-muted msgDate">
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
