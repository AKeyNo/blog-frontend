import React, {useState} from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [blogLikes, setBlogLikes] = useState(blog.likes);

  const like = async () => {
    await blogService.like(blog.id, blog);
    setBlogLikes(blogLikes + 1);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>{blog.url}</div>
      <div key={blog}>
        likes: {blogLikes} <button onClick={like}>like</button>
      </div>
    </div>
  );
};

export default Blog;
