import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const NavDashboard = () => {
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const logOut = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => logOut();
  }, []);

  const handleLogout = async () => {
    setAlert({ type: "danger", message: "User Logged out!" });
    await signOut(auth);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand brand">
            <h1>DataCave</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <div className="d-flex align-items-center gap-1 border bg-success-subtle rounded p-2 user-acc">
                  <div>
                    <strong>{user ? user.email : "Guest"}</strong>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="text-center">
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            {alert.message}
          </div>
        )}
      </div>
    </>
  );
};

export default NavDashboard;
