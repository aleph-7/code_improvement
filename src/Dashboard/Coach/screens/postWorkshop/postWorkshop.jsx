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
    raquet: "0",
    cork: "0",
    shoe: "0",
    start_time: "",
    end_time: "",
  });

  const [error, setError] = useState({
    description: "",
    max_participants: "",
    date: "",
    raquet: "",
    cork: "",
    shoe: "",
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

        case "date":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid date.";
          }
          break;

        case "raquet":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid number.";
          } else {
            if (Number(value) < 0)
              stateObj[name] = "Please enter a valid number.";
            if (Number(value) > 20)
              stateObj[name] = "Please enter a valid number, less than 21.";
          }

          break;

        case "cork":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid number.";
          } else {
            if (Number(value) < 0)
              stateObj[name] = "Please enter a valid number.";
            if (Number(value) > 20)
              stateObj[name] = "Please enter a valid number, less than 21.";
          }
          break;

        case "shoe":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid number.";
          } else {
            if (Number(value) < 0)
              stateObj[name] = "Please enter a valid number.";
            if (Number(value) > 20)
              stateObj[name] = "Please enter a valid number, less than 21.";
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

        case "end_time":
          if (!value) {
            stateObj[name] = "";
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
    if (!input.end_time) {
      alert("End time is required.");
      setError((prev) => ({ ...prev, end_time: "End time is required." }));
    }
    if (!input.max_participants) {
      alert("Max participants is required.");
      setError((prev) => ({
        ...prev,
        max_participants: "Max participants is required.",
      }));
    }
    if (
      input.start_time &&
      input.end_time &&
      input.start_time > input.end_time
    ) {
      alert("Start time should be less than end time.");
      setError((prev) => ({
        ...prev,
        start_time: "Start time should be less than end time.",
      }));
    }
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
        <input
          type="text"
          placeholder="date of workshop"
          className="coach_input_large"
          name="date"
          value={input.date}
          onChange={onInputChange}
          onBlur={validateInput}
        />
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

        <div className="heading-page">
          <h2>equipments needed : </h2>
        </div>
        <div className="coach_equipment_selector">
          <div className="coach_equipment_selector_equipment">
            <h3> raquet</h3>
            <input
              type="text"
              placeholder="number of raquets needed"
              className="coach_input_small"
              name="raquet"
              value={input.raquet}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.raquet && (
              <span className="err">
                <h3>{error.raquet}</h3>
              </span>
            )}
          </div>
          <div className="coach_equipment_selector_equipment">
            <h3> cork </h3>
            <input
              type="text"
              placeholder="number of corks needed"
              className="coach_input_small"
              name="cork"
              value={input.cork}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.cork && (
              <span className="err">
                <h3>{error.cork}</h3>
              </span>
            )}
          </div>
          <div className="coach_equipment_selector_equipment">
            <h3> shoe</h3>
            <input
              type="text"
              placeholder="number of shoes needed"
              className="coach_input_small"
              name="shoe"
              value={input.shoe}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.shoe && (
              <span className="err">
                <h3>{error.shoe}</h3>
              </span>
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="start time of workshop"
          className="coach_input_large"
          name="start_time"
          value={input.start_time}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        <input
          type="text"
          placeholder="end time of workshop"
          className="coach_input_large"
          name="end_time"
          value={input.end_time}
          onChange={onInputChange}
          onBlur={validateInput}
        />

        <button className="coach_workshop_post_button" onClick={onClickButton}>
          post workshop
        </button>
      </div>
    </div>
  );
};
export default PostWorkshop;
