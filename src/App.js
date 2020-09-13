import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/LoginForm";
import blogService from "./services/blogs";
import Notification from './components/Notification'
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <Notification message={errorMessage} />
      <Login setErrorMessage={setErrorMessage}/>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
