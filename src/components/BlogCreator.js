import React, { useState } from "react";
import blogService from "../services/blogs.js";
import Toasts from "./CustomToasts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogCreator = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      await createBlog({
        title,
        author,
        url,
      });

      toast.success(`Sucessfully added ${title}!`, Toasts.defaultToast);
      setTitle("");
      setAuthor("");
      setURL("");
    } catch (exception) {
      toast.error(`Invalid blog. Please try again.`, Toasts.defaultToast);
    }
  };

  return (
    <div>
      <ToastContainer/>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default BlogCreator;