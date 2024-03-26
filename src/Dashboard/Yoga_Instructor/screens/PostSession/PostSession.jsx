import React, { useState } from "react";
import "./PostSession.css";
import SERVER_ROOT_PATH from "../../../../../config";

function PostSession() {
  const [input, setInput] = useState({
    content: "",
    location: "",
    batch_size: "",
    startDate: "",
    startTime: "",
    endTime: "",
  });

  const [error, setError] = useState({
    content: "",
    location: "",
    batch_size: "",
    startDate: "",
    startTime: "",
    endTime: "",
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
            stateObj[name] = "Content is required.";
          }
          break;
        case "location":
          if (!value) {
            stateObj[name] = "Location is required.";
          }
          break;
        case "batch_size":
          if (!value) {
            stateObj[name] = "Batch size is required.";
          }
          if (isNaN(value) == false) {
            stateObj[name] = "Batch size should be an integer.";
          }
          break;
        case "startDate":
          if (!value) {
            stateObj[name] = "Start date is required.";
          }
          break;
        case "startTime":
          if (!value) {
            stateObj[name] = "Start time is required.";
          }
          break;
        case "endTime":
          if (!value) {
            stateObj[name] = "End time is required.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  const onClickSubmit = async () => {
    // if (
    //   !input.content ||
    //   !input.location ||
    //   !input.batch_size ||
    //   !input.startDate ||
    //   !input.startTime ||
    //   !input.endTime
    // ) {
    //   alert("Please fill all the fields teri mkc");
    //   return;
    // }

    // if (!validator.isDate(input.startDate)) {
    //   alert("Please enter a valid date");
    //   return;
    // }

    // if (!validator.isTime(input.startTime)) {
    //   alert("Please enter a valid start time");
    //   return;
    // }

    // if (!validator.isTime(input.endTime)) {
    //   alert("Please enter a valid end time");
    //   return;
    // }

    const response = await fetch(SERVER_ROOT_PATH + "/yoga/postSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (response.status === 200) {
      alert("Session posted successfully");
    } else {
      alert("Failed to post session");
    }
  };

  return (
    <div className="yoga-postSession-container">
      <div className="input-container">
        <input
          type="text"
          className="session_name"
          placeholder="content"
          name="content"
          value={input.content}
          onChange={onInputChange}
          onBlue={validateInput}
        />
        <input
          type="text"
          className="location"
          placeholder="location"
          name="location"
          value={input.location}
          onChange={onInputChange}
          onBlue={validateInput}
        />
        <input
          type="text"
          className="batch_size"
          placeholder="batch size"
          name="batch_size"
          value={input.batch_size}
          onChange={onInputChange}
          onBlue={validateInput}
        />
        <div className="dates">
          <input
            type="text"
            className="startDate"
            placeholder="start date"
            name="startDate"
            value={input.startDate}
            onChange={onInputChange}
            onBlue={validateInput}
          />
        </div>
        <div className="time">
          <input
            type="text"
            className="startTime"
            placeholder="start time"
            name="startTime"
          />
          <input
            type="text"
            className="endTime"
            placeholder="end time"
            name="endTime"
            onChange={onInputChange}
            onBlue={validateInput}
          />
        </div>
        <div className="button-container">
          <button className="login-submit" onClick={onClickSubmit}>
            post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostSession;
