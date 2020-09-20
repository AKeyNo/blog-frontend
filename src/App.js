import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/LoginForm";
import BlogCreator from "./components/BlogCreator";
import blogService from "./services/blogs";
import loginService from "./services/login";

import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const tempuser = JSON.parse(loggedUserJSON);
      setUser(tempuser);
      blogService.setToken(tempuser.token);
    }
  }, []);

  const createBlog = async (blogObj) => {
    const newBlog = await blogService.create(blogObj);

    setBlogs(blogs.concat(newBlog));
  };

  const logUser = async (userObj) => {
    const loggedUser = await Login;
  };

  return (
    <div>
      <Login user={user} setUser={setUser} />
      {user !== null ? <BlogCreator createBlog={createBlog} /> : null}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
