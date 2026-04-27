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
              <li className="nav-item mx-lg-4 mb-lg-0 mb-2">
                <div className="input-group">
                  <input
                    type="search"
                    name="search"
                    id="searchBar"
                    placeholder="Search here..."
                    className="form-control rounded p-2"
                  />
                  <button
                    className="btn btn-dark px-4"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </li>
              <li className="nav-item mx-lg-4">
                <div className="d-flex align-items-center gap-1 border bg-success-subtle rounded rounded-5 p-2 user-acc">
                  <div>
                    <strong>{user ? user.email : "Guest"}</strong>
                  </div>
                  <button
                    className="btn btn-danger btn-sm rounded rounded-5 logOut-btn"
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
