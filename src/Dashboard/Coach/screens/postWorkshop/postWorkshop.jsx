import React, { useState } from "react";
import "./postWorkshop.css";
import SERVER_ROOT_PATH from "../../../../../config";

const PostWorkshop = () => {
  const [input, setInput] = useState({
    coach_user_id: localStorage.getItem("userMongoId"),
    max_participants: "",
    type_of_sport: localStorage.getItem("type_of_sport"),
    description: "",
    date: "",
    start_time: "",
    end_time: "",
  });

  const [error, setError] = useState({
    description: "",
    max_participants: "",
    date: "",
    start_time: "",
    end_time: "",
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
        case "description":
          if (!value) {
            stateObj[name] = "";
          }
          break;

        case "start_time":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid time.";
          } else {
            if (Number(value) < 5)
              stateObj[name] = "Please enter a valid time.";
            if (Number(value) > 20)
              stateObj[name] = "Please enter a valid time, less than 21.";
          }
          break;

        case "max_participants":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid number.";
          } else {
            if (Number(value) < 0)
              stateObj[name] = "Please enter a valid number.";
            if (Number(value) > 50)
              stateObj[name] = "Please enter a valid number, less than 51.";
          }
          break;

        default:
          break;
      }
      return stateObj;
    });
  };

  const validateDate = (date) => {
    if (date === "") {
      alert("Date cannot be empty");
      return false;
    }
    let dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(date)) {
      alert("Invalid date format. Please enter date in dd/mm/yyyy format");
      return false;
    }
    let dateArray = date.split("/");
    let day = parseInt(dateArray[0]);
    let month = parseInt(dateArray[1]);
    let year = parseInt(dateArray[2]);
    if (month < 1 || month > 12) {
      alert("Invalid month. Please enter month between 1 and 12");
      return false;
    } else if (
      month == 1 ||
      month == 3 ||
      month == 5 ||
      month == 7 ||
      month == 8 ||
      month == 10 ||
      month == 12
    ) {
      if (day < 1 || day > 31) {
        alert("Invalid day. Please enter day between 1 and 31");
        return false;
      }
    } else if (month == 2) {
      if (year % 4 == 0) {
        if (day < 1 || day > 29) {
          alert("Invalid day. Please enter day between 1 and 29");
          return false;
        }
      } else {
        if (day < 1 || day > 28) {
          alert("Invalid day. Please enter day between 1 and 28");
          return false;
        }
      }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      if (day < 1 || day > 30) {
        alert("Invalid day. Please enter day between 1 and 30");
        return false;
      }
    }
    if (year < 2024 || year > 2025) {
      alert("Invalid year. Please enter year between 2024 and 2025");
      return false;
    }

    let currentDate = new Date();

    if (year < currentDate.getFullYear()) {
      alert(
        "Invalid year. Please enter year greater than or equal to current year"
      );
      return false;
    } else if (
      year == currentDate.getFullYear() &&
      month < currentDate.getMonth() + 1
    ) {
      alert(
        "Invalid month. Please enter month greater than or equal to current month"
      );
      return false;
    } else if (
      year == currentDate.getFullYear() &&
      month == currentDate.getMonth() + 1 &&
      day < currentDate.getDate()
    ) {
      alert(
        "Invalid day. Please enter day greater than or equal to current day"
      );
      return false;
    }
    return true;
  };

  const onClickButton = async () => {
    if (!input.description) {
      alert("Description is required.");
      setError((prev) => ({
        ...prev,
        description: "Description is required.",
      }));
    }
    if (!input.date) {
      alert("Date is required.");
      setError((prev) => ({ ...prev, date: "Date is required." }));
    }

    if (!input.start_time) {
      alert("Start time is required.");
      setError((prev) => ({ ...prev, start_time: "Start time is required." }));
    }
    if (!input.max_participants) {
      alert("Max participants is required.");
      setError((prev) => ({
        ...prev,
        max_participants: "Max participants is required.",
      }));
    }
    input.end_time = parseInt(input.start_time) + 1;
    if (
      error.description === "" &&
      error.date === "" &&
      error.start_time === "" &&
      error.max_participants === "" &&
      validateDate(input.date) === true
    ) {
      try {
        const response = await fetch(SERVER_ROOT_PATH + "/coach/postWorkshop", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        if (response.status === 200) {
          alert("Workshop posted successfully.");
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="coach-postworkshop-container">
        <input
          type="text"
          placeholder="description"
          className="coach_input_large"
          name="description"
          value={input.description}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.description && <span className="errs">{error.description}</span>}
        <input
          type="text"
          placeholder="date of workshop"
          className="coach_input_large"
          name="date"
          value={input.date}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.date && <span className="errs">{error.date}</span>}
        <input
          type="text"
          placeholder="maximum number of participants"
          className="coach_input_large"
          name="max_participants"
          value={input.max_participants}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.max_participants && (
          <span className="errs">{error.max_participants}</span>
        )}
        <input
          type="text"
          placeholder="start time of workshop"
          className="coach_input_large"
          name="start_time"
          value={input.start_time}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        {error.start_time && <span className="errs">{error.start_time}</span>}
        <button className="coach_workshop_post_button" onClick={onClickButton}>
          post workshop
        </button>
      </div>
    </div>
  );
};
export default PostWorkshop;
