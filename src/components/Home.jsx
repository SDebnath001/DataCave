import React, { useState } from "react";
import Img from "/img-data.jpg";
import Nav from "./Nav";
import axios from "axios";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const user = auth.currentUser;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/messages`, {
        name: data.name,
        email: user ? user.email : data.email,
        message: data.message,
        userId: user ? user.uid : null,
      });

      setAlert({ type: "success", message: "Message sent successfully!" });
      reset();
    } catch (error) {
      console.error(error);
      setAlert({ type: "danger", message: "Failed to send message" });
    }
  };
  return (
    <>
      <Nav />
      <section id="about">
        <div className="heading">
          <h1>Your Data. Locked. Loaded. Always Within Reach.</h1>
          <div className="details">
            <p>
              Store, manage, and protect all your DATA in one secure place. No
              more forgotten logins. No more risky notes.
            </p>
          </div>
        </div>
        <div className="about-data">
          <h1>ABOUT US</h1>
          <div className="about-dt">
            <div>
              <p>
                Managing DATA shouldn’t feel like solving a puzzle every time
                you log in.
              </p>
              <p>
                Our password manager is designed to simplify your digital life
                while keeping your data secure. Whether it’s social media,
                banking, or work accounts, everything is safely stored and
                easily accessible when you need it.
              </p>
              <p>
                We use modern security practices to ensure your sensitive
                information stays protected, while providing a clean and
                intuitive experience that anyone can use.
              </p>
              <p>
                No clutter. No confusion. Just secure access—anytime, anywhere.
              </p>
            </div>
            <div>
              <img src={Img} alt="" className="about-img" />
            </div>
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="contact-data">
          <div>
            <h1>CONTACT US</h1>
            <div className="contact-text">
              <p>
                <strong>“Built for simplicity. Designed for security.”</strong>
              </p>
              <p style={{ marginTop: "2em", fontSize: "2em" }}>
                Send us your message
              </p>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2"> Your Name :</label>
                <br />
                <input
                  type="text"
                  name="name"
                  id="userName"
                  placeholder="Your name here"
                  className="input-field"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name.message}</div>
                )}
              </div>
              <div>
                <label className="mb-2"> Your Email :</label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="userEmail"
                  placeholder="name@examplemail.com"
                  className="input-field"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="mb-2">Your Message :</label>
                <br />
                <textarea
                  name="message"
                  id="messageArea"
                  placeholder="Type your message here.."
                  rows={8}
                  className="input-field"
                  {...register("message", {
                    required: "Message cannot be empty",
                    minLength: {
                      value: 5,
                      message: "Message too short",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <p className="text-danger">{errors.message.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "SEND"}
                </button>
              </div>
              <div>
                {alert && (
                  <div
                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                    role="alert"
                  >
                    {alert.message}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
