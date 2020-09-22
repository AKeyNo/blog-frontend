import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "../Blog";

describe("<Blog />", () => {
  let component;

  const blog = {
    title: "Test Blog",
    author: "Bob",
    url: "test.com",
    likes: 100,
    user: {
      username: "test",
      name: "Admin",
    },
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} />);
  });

  test("renders content", () => {
    const li = component.container.querySelector("li");

    console.log(prettyDOM(li));
  });

  test("has bob", () => {
    const div = component.container.querySelector(".titleAndAuthor");

    expect(div).toHaveTextContent("Test Blog by Bob");
    console.log(prettyDOM(div));
  });

  /*test("like button works", () => {
    const blog2 = {
      title: "Crypto and You",
      author: "Steve",
      url: "crypto.com",
      likes: 25,
      user: {
        username: "cryptorules",
        name: "Steve",
      },
    };

    const component2 = render(<Blog blog={blog2} />);

    const button = component2.container.querySelector(".likeButton");
    const div = component2.container.querySelector(".likeSection");
    fireEvent.click(button);
    expect(div).toHaveTextContent("likes: 26");
  });*/
});
