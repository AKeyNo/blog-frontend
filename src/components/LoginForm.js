import React, { useState } from "react";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

const LoginForm = ({ setErrorMessage, user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    setUser(null);
    try {
      window.localStorage.removeItem("loggedBlogUser");
    } catch (exception) {
      setErrorMessage("something went wrong with logging out");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {logoutButton()}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
