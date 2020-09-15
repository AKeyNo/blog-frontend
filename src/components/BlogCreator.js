import React, { useState } from "react";
import blogService from "../services/blogs.js";

const BlogCreator = ({ setErrorMessage, user, blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const tempBlog = await blogService.create({
        title,
        author,
        url,
        user,
      });

      setTitle("");
      setAuthor("");
      setURL("");
      setBlogs(blogs.concat(tempBlog));
    } catch (exception) {
      setErrorMessage("invalid blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
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
