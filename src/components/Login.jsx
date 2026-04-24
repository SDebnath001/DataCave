import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      setAlert({ type: "success", message: "User Login successful!" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setAlert({ type: "danger", message: "Invalid email or password!" });
    }
  };
  return (
    <div className="login-area">
      <h1>WELCOME! LOGIN HERE</h1>
      <div className="login-box container border rounded rounded-4 p-lg-5 p-3 mx-auto">
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert(null)}
            ></button>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Login Email</label>
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              id="UserEmail"
              placeholder="e.g. demomail123@gmail.com"
              {...register("email", { required: "User email required" })}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label className="form-label">Login Password</label>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              id="UserPass"
              placeholder="Your Password here"
              {...register("password", {
                required: "Typer the login password",
              })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="mt-4">
            <button type="submit" className="btn-login" disabled={isSubmitting}>
              {isSubmitting ? "logging in..." : "LOGIN"}
            </button>
          </div>
          <div className="register-page">
            <p>
              New user?{" "}
              <strong>
                <Link to={"/register"}>register here</Link>
              </strong>
            </p>
            <p>
              <strong>Send us a message</strong> &nbsp;
              <strong>
                <Link to={"/"}>
                  <button className="btn btn-outline-primary">Home</button>
                </Link>
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
