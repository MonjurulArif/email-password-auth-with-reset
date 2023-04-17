import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const LoginBootstrap = () => {
  const [success, setSuccess] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("email: " + email, "password: " + password);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log("User: ", user);
        setSuccess(true);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  const handleEmailBlur = (event) => {
    const email = event.target.value;
    setUserEmail(email);
    console.log("Email: ", email);
  };

  const handleForgetPassword = () => {
    if (!userEmail) {
      alert("Please enter your email address");
      return;
    }

    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Password reset email sent. Please check your email.");
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h3 className="text-success">Please Login!!</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Your Email
          </label>
          <input onBlur={handleEmailBlur} type="email" name="email" className="form-control" id="formGroupExampleInput" placeholder="Your Email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Your Password
          </label>
          <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Your password" required />
        </div>
        <button className="btn btn-primary " type="submit">
          Login
        </button>
      </form>
      {success && <p>Successfully logged in to the account</p>}
      <p>
        <small>New to this website? please</small> <Link to="/register">Register</Link>
      </p>
      <small>
        <p>
          Forget Password?{" "}
          <button type="button" onClick={handleForgetPassword} className="btn btn-link">
            Reset Password
          </button>
        </p>
      </small>
    </div>
  );
};

export default LoginBootstrap;
