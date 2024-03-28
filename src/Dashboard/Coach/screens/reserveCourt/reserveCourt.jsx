import React, { useState } from "react";
import "./reserveCourt.css";
import SERVER_ROOT_PATH from "../../../../../config";

const ReserveCourt = () => {
  const [input, setInput] = useState({
    user_id: localStorage.getItem("userMongoId"), //user id is the coach id
    type_of_sport: localStorage.getItem("type_of_sport"),
    show_up_status: "0",
    time_of_booking: "",
    booking_status: "0",
    no_partners: "0",
    court_id: "",
    date_slot: "", // string storing the date
    time_slot: "", // 1hr duration beginning at time_slot
    partners_id: [],
  });

  const [error, setError] = useState({
    date_slot: "", // string storing the date
    time_slot: "", // 1hr duration beginning at time_slot
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
        case "date_slot":
          if (!value) {
            stateObj[name] = "";
          }
          if (isNaN(value)) {
            stateObj[name] = "Please enter a valid date.";
          }
          break;

        case "time_slot":
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
        default:
          break;
      }
      return stateObj;
    });
  };

  const onClickButton = async () => {
    if (!input.date_slot) {
      alert("Date is required.");
      setError((prev) => ({
        ...prev,
        date_slot: "Date is required.",
      }));
    }
    if (!input.time_slot) {
      alert("Time is required.");
      setError((prev) => ({ ...prev, time_slot: "Time is required." }));
    }
    try {
      const currentTime = new Date(); // Get current time
      input.time_of_booking = currentTime; // Set the current time as input.time_of_booking
      const response = await fetch(SERVER_ROOT_PATH + "/coach/reserveCourt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Court Reserved successfully.");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="coach-reservecourt-container">
        <input
          type="text"
          placeholder="date of reservation"
          className="coach_input_large"
          name="date_slot"
          value={input.date_slot}
          onChange={onInputChange}
          onBlur={validateInput}
        />

        <input
          type="text"
          placeholder="start time"
          className="coach_input_large"
          name="time_slot"
          value={input.time_slot}
          onChange={onInputChange}
          onBlur={validateInput}
        />
        <button className="coach_reserve_court_button" onClick={onClickButton}>
          reserve court
        </button>
      </div>
    </div>
  );
};
// style={{ left: "33px", top: "93px" }}
export default ReserveCourt;
