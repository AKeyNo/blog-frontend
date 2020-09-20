import React, { useState } from "react";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import Toasts from "./CustomToasts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      toast.success(
        `Sucessfully logged in as ${username}!`,
        Toasts.defaultToast
      );
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      toast.error(
        "Invalid credentials. Please try again.",
        Toasts.defaultToast
      );
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    try {
      window.localStorage.removeItem("loggedBlogUser");
      toast.success(`Sucessfully logged out!`, Toasts.defaultToast);
    } catch (exception) {
      toast.error(
        `Something went wrong with logging out.`,
        Toasts.defaultToast
      );
    }
  };

  const logoutButton = () => <button onClick={handleLogout}>logout</button>;

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            autoComplete={true}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            autoComplete={true}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p> {logoutButton()}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
