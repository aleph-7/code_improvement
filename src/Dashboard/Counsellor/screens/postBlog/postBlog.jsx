import React from "react";
import "./postBlog.css";
import { useState } from "react";
import Articles from "../articles/Articles";
import SERVER_ROOT_PATH from "../../../../../config";

const PostBlog = () => {
  const titleCap = 50;
  const contentCap = 10000;
  const [input, setInput] = useState({
    content: "",
    title: "",
    counsellor_username: localStorage.getItem("userId"),
  });
  const [error, setError] = useState({
    content: "",
    title: "",
    counsellor_username: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "content":
          if (!value) {
            stateObj[name] = "";
          }
          break;
        case "title":
          if (!value) {
            stateObj[name] = "";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };
  const onClickButtonPost = async () => {
    if (!input.content) {
      alert("Content is required.");
      setError((prev) => ({
        ...prev,
        content: "Content is required.",
      }));
      return;
    }
    if (!input.title) {
      alert("Title is required.");
      setError((prev) => ({ ...prev, title: "Title is required." }));
      return;
    }
    
    if (input.title.length > titleCap){
      alert(`Title must be less than ${titleCap} characters long.`);
      setError((prev) => ({ ...prev, title: `Title must be less than ${titleCap} characters long.` }));
      return;
    }
    if (input.content.length > contentCap){
      alert(`Content must be less than ${contentCap} characters long.`);
      setError((prev) => ({ ...prev, content: `Title must be less than ${contentCap} characters long.` }));
      return;
    }
    try {
      const response = await fetch(SERVER_ROOT_PATH + "/counsellor/postBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Blog posted successfully.");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="counsellor-post">
      <h2>new post</h2>
      <div className="new-post">
        <div className="box-1">
          <h3>Title:</h3>
          <input
            name="title"
            value={input.title}
            onChange={onInputChange}
            onBlur={validateInput}
          ></input>
          {/* <h3>Type:</h3>
          <input></input> */}
        </div>
      </div>
      <div className="content-heading">
        <h3>Content:</h3>
      </div>
      <div className="content">
        {/* <input type="text"></input> */}
        <textarea
          name="content"
          value={input.content}
          onChange={onInputChange}
          onBlur={validateInput}
        />
      </div>
      <div className="post-button">
        <button onClick={onClickButtonPost}>Post</button>
      </div>
    </div>
  );
};

export default PostBlog;
