import React from "react";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav>
        <h1>Email Password Authentication using Firebase</h1>
        {/* <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> */}
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
