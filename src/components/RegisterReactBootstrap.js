import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [passwordError, setPasswordError] = useState("");

  const [success, setSuccess] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const name = form.name.value;
    // console.log(event.target);
    // const email = event.target.email.value;
    const email = form.email.value;
    // const password = event.target.password.value;
    const password = form.password.value;
    console.log(name, email, password);

    //validate password
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Please provide at least two uppercase");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("Please add at least one special character");
      return;
    }
    setPasswordError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log("User: ", user);
        setSuccess(true);
        form.reset();
        verifyEmail();
        updateUserName(name);
      })
      .catch((error) => {
        console.error("Error: " + error);
        setPasswordError(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Please check your email and verify your email address.");
    });
  };

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Display name updated.");
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h3 className="text-warning">Please Register</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" required />
        </Form.Group>

        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">User Created Succesfully</p>}

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        <small>Already have an account? please</small> <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default RegisterReactBootstrap;
