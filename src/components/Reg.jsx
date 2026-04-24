import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { type } from "firebase/firestore/pipelines";

const Reg = () => {
  const [alert, setAlert] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      setAlert({type: "success", message: "New User Registered Successful!"});
      reset();
    } catch (error) {
      setAlert({type: "danger", message: error});
    }
  };

  return (
    <div className="register-area">
      <h1>WELCOME! CREATE YOUR FREE ACCOUNT</h1>
      <div className="reg-box container border rounded rounded-4 p-lg-5 p-3 mx-auto">
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
            <label className="form-label">Your Email</label>
            <br />
            <input
              className="form-control"
              type="email"
              name="email"
              id="NewUserEmail"
              placeholder="e.g. demomail123@gmail.com"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
          <div>
            <label className="form-label">Type Password</label>
            <br />
            <input
              className="form-control"
              type="password"
              name="password"
              id="NewUserPass"
              placeholder="Your Password here"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters must",
                },
              })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="mt-4">
            <button type="submit" className="btn-login" disabled = {isSubmitting}>
             {isSubmitting ? "submitting.." : "REGISTER"}
            </button>
          </div>
          <div className="register-page">
            <p>
              Already have an account? &nbsp;
              <strong>
                <Link to={"/login"}>Login..</Link>
              </strong>
            </p>
            <p>
              <strong>Send a message</strong> &nbsp;
              <strong>
                <Link to={"/"}>
                <button className="btn btn-outline-primary">Home</button></Link>
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reg;
