import logo from "./logo.svg";
import "./App.css";
import { getAuth } from "firebase/auth";
import app from "./firebase/firebase.init";
import RegisterReactBootstrap from "./components/RegisterReactBootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import LoginBootstrap from "./components/LoginBootstrap";

const auth = getAuth(app);

// const handleRegister = (event) => {
//   event.preventDefault();
//   // console.log(event.target);
//   //email -> input name
//   const email = event.target.email.value;
//   const password = event.target.password.value;
//   console.log(email, password);
// };

// const handleEmailChange = (event) => {
//   //email value
//   console.log(event.target.value);
// };
// const handleEmailBlur = (event) => {
//   //email value
//   console.log(event.target.value);
// };

// const handlePasswordChange = (event) => {
//   console.log(event.target.value);
// };
// const handlePasswordBlur = (event) => {
//   console.log(event.target.value);
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main>0</Main>,
    children: [
      { path: "/", element: <RegisterReactBootstrap></RegisterReactBootstrap> },
      { path: "/register", element: <RegisterReactBootstrap></RegisterReactBootstrap> },
      { path: "/login", element: <LoginBootstrap></LoginBootstrap> },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>

      {/* <form onSubmit={handleRegister}>
        <input onChange={handleEmailChange} type="email" name="email" id="" placeholder="Your Email" />
        <input onBlur={handleEmailBlur} type="email" name="email" id="" placeholder="Your Email" />
        <br />
        <input onChange={handlePasswordChange} type="password" name="password" id="" placeholder="Your Password" />
        <input onBlur={handlePasswordBlur} type="password" name="password" id="" placeholder="Your Password" />
        <br />
        <button type="submit">Register</button>
      </form> */}
    </div>
  );
}

export default App;
