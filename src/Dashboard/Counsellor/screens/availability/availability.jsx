import React from "react";
import Notify from "../notifybutton/Notify";
import "./availability.css";
import { useState } from "react";
import { useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";

const Availability = () => {
  const [inputDay, setInputDay] = useState({
    day_vector: Array(7).fill(0),
    hour_vector: Array(24).fill(0),
    counsellor_user_id: localStorage.getItem("userMongoId"),
    date_slot: "none",
    date_slot_time_vector: Array(24).fill(0),
  });
  const [inputDate, setInputDate] = useState({
    date_slot: "",
    date_slot_time_vector: Array(24).fill(0),
    counsellor_user_id: localStorage.getItem("userMongoId"),
    day_vector: Array(7).fill(0),
    hour_vector: Array(24).fill(0),
  });
  const [message, setMessage] = useState([]);

  useEffect(() => {
    // const delPrevDates = async () => {
    //   try {
    //     return await fetch(SERVER_ROOT_PATH + "/counsellor/deleteOldDateAvailability",  {
    //       method : "POST",
    //       headers: {
    //         "Content-Type" : "application/json",
    //       },
    //       body: JSON.stringify({
    //         counsellor_user_id: inputDay.counsellor_user_id,
    //       }),
    //     })
    //     .then((res) => res.json())
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // delPrevDates();
    const getAvailability = async () => {
      try {
        return await fetch(SERVER_ROOT_PATH + "/counsellor/getAvailability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            counsellor_user_id: inputDay.counsellor_user_id,
          }),
        })
          .then((res) => res.json())
          .then((data) => setMessage(data.message));
      } catch (err) {
        console.log(err);
      }
    };
    getAvailability();
    // console.log(message.length);
  }, []);

  function getTimeSlot(time) {
    if (time < 11) {
      return `${time} am to ${time + 1} am`;
    } else if (time > 12) {
      return `${time - 12} pm to ${time - 11} pm`;
    } else if (time === 11) {
      return `11 am to 12 pm`;
    } else if (time === 12) {
      return `12 pm to 1 pm`;
    }
  }

  function getDaysOfWeek(day_vector) {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let result = "";

    for (let i = 0; i < day_vector.length; i++) {
      if (day_vector[i] === 1) {
        result += daysOfWeek[i] + ", ";
      }
    }

    // Remove the trailing comma and space
    result = result.slice(0, -2);

    return result;
  }

  const deleteDayAvailability = async () => {
    return await fetch(SERVER_ROOT_PATH + "/counsellor/deleteDayAvailability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        counsellor_user_id: localStorage.getItem("userMongoId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };
  const deleteDateAvailability = async (date_slot) => {
    return await fetch(
      SERVER_ROOT_PATH + "/counsellor/deleteDateAvailability",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          counsellor_user_id: localStorage.getItem("userMongoId"),
          date_slot: date_slot,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };
  function isValidDate(dateString) {
    const dateParts = dateString.split("/");
    let isValid = true;
    let err = "";

    // Check if the date string has three parts
    if (dateParts.length !== 3) {
      isValid = false;
      err = "Invalid date format. Please use DD/MM/YYYY format.";
      return { isValid, err };
    }
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    if (dateParts[0].length !== 2) {
      isValid = false;
      err = "Invalid day format. Please use two characters for the day.";
      return { isValid, err };
    }
    if (dateParts[1].length !== 2) {
      isValid = false;
      err = "Invalid month format. Please use two characters for the month.";
      return { isValid, err };
    }
    if (dateParts[2].length !== 4) {
      isValid = false;
      err = "Invalid year format. Please use four characters for the year.";
      return { isValid, err };
    }

    // Check if the year is a leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // Define the maximum number of days for each month
    const maxDaysInMonth = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    // Validate the day based on the month and leap year
    if (
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= maxDaysInMonth[month - 1]
    ) {
      err = "Date is valid.";
      return { isValid, err };
    } else {
      isValid = false;
      err = "Invalid date.";
      return { isValid, err };
    }
  }
  function DaysInFuture(dateString) {
    const dateStatus = isValidDate(dateString);

    let err = "";
    let daysInFuture = 0;

    if (!dateStatus.isValid) {
      err = dateStatus.err;
      return { daysInFuture, err };
    }

    // Split the date into day, month, and year
    const parts = dateString.split("/");

    // Rearrange the parts to form the new date format (mm/dd/yyyy)
    const invertedDateString = `${parts[1]}-${parts[0]}-${parts[2]}`;

    const thisDate = new Date(invertedDateString);
    const currentDate = new Date();
    // console.log(thisDate);
    
    const timeDifference = thisDate.getTime() - currentDate.getTime();
    daysInFuture = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Calculate days difference

    return { daysInFuture, err };
  }

  const [error, setError] = useState({
    day_vector: "",
    hour_vector: "",
    date_slot: "",
    date_slot_time_vector: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputDate((prev) => ({
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
          const dateValidator = isValidDate(value);
          if (!dateValidator.isValid) {
            stateObj[name] = dateValidator.err;
          }
          const out = DaysInFuture(value);
          if (out.daysInFuture > 31) {
            stateObj[name] =
              "The input date must be at most 30 days from today";
          }
          if (out.daysInFuture < 0) {
            stateObj[name] = "The input date must be in the future!";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  const onClickButtonDay = async () => {
    // Get all the checkboxes inside the 'daypicker' div
    const checkboxesDay = document.querySelectorAll(
      '#daysOfWeek input[type="checkbox"]'
    );
    // Loop through each checkbox and update the day_vector array
    checkboxesDay.forEach((checkbox) => {
      const value = parseInt(checkbox.value); // Get the value attribute as an integer

      if (checkbox.checked) {
        inputDay.day_vector[value] = 1; // Set the value to 1 if the checkbox is checked
      } else {
        inputDay.day_vector[value] = 0;
      }
    });
    // Get all the checkboxes inside the 'daypicker' div
    const checkboxesTime = document.querySelectorAll(
      '#timeForDaysOfWeek input[type="checkbox"]'
    );
    // Loop through each checkbox and update the day_vector array
    checkboxesTime.forEach((checkbox) => {
      const value = parseInt(checkbox.value); // Get the value attribute as an integer

      if (checkbox.checked) {
        inputDay.hour_vector[value] = 1; // Set the value to 1 if the checkbox is checked
      } else {
        inputDay.hour_vector[value] = 0;
      }
    });
    if (
      !(
        !inputDay.day_vector || inputDay.day_vector.some((value) => value !== 0)
      )
    ) {
      alert("At least one day must be selected.");
      setError((prev) => ({
        ...prev,
        day_vector: "At least one day must be selected.",
      }));
      return;
    }
    if (
      !(
        !inputDay.hour_vector ||
        inputDay.hour_vector.some((value) => value !== 0)
      )
    ) {
      alert("At least one time slot must be selected.");
      setError((prev) => ({
        ...prev,
        hour_vector: "At least one time slot must be selected.",
      }));
      return;
    }

    //delete the entries with non-zero day vector
    deleteDayAvailability().then(() => {
      console.log("Availability Deleted!");
      // console.log(message.length)
    });

    try {
      const response = await fetch(
        SERVER_ROOT_PATH + "/counsellor/availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputDay),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        alert("Availability updated successfully.");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onClickButtonDate = async () => {
    // Get all the checkboxes inside the 'daypicker' div

    const checkboxes = document.querySelectorAll(
      '#timeForDateOfWeek input[type="checkbox"]'
    );
    // Loop through each checkbox and update the day_vector array
    checkboxes.forEach((checkbox) => {
      const value = parseInt(checkbox.value); // Get the value attribute as an integer

      if (checkbox.checked) {
        inputDate.date_slot_time_vector[value] = 1; // Set the value to 1 if the checkbox is checked
      } else {
        inputDate.date_slot_time_vector[value] = 0;
      }
    });
    if (!inputDate.date_slot) {
      alert("Date is required.");
      setError((prev) => ({
        ...prev,
        description: "Date is required.",
      }));
      return;
    }
    if (
      !(
        !inputDate.date_slot_time_vector ||
        inputDate.date_slot_time_vector.some((value) => value !== 0)
      )
    ) {
      alert("At least one time slot is required.");
      setError((prev) => ({
        ...prev,
        date_slot_time_vector: "At least one time slot is required.",
      }));
      return;
    }
    const out = isValidDate(inputDate.date_slot);
    if (!out.isValid) {
      alert(out.err);
      setError((prev) => ({
        ...prev,
        date_slot: out.err,
      }));
      return;
    }
    const out2 = DaysInFuture(inputDate.date_slot);
    console.log(inputDate.date_slot);
    console.log(out2);
    if (out2.daysInFuture > 31) {
      alert("The input date must be at most 30 days from today");
      return;
    }
    if (out2.daysInFuture < 0) {
      alert("The input date must be in the future!");
      return;
    }
    //delete date availabilty
    deleteDateAvailability(inputDate.date_slot).then(() => {
      console.log("Availability for date Deleted!");
      // console.log(message.length)
    });
    try {
      const response = await fetch(
        SERVER_ROOT_PATH + "/counsellor/availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputDate),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        alert("Availability updated successfully.");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="counsellor-availability">
      <div className="notify start">
        <Notify />
      </div>

      <div className="day-availablity">
        <p className="text">day(s)</p>

        <div className="daypicker" id="daysOfWeek">
          <label>
            <input type="checkbox" value="0" />
            Monday
          </label>
          <label>
            <input type="checkbox" value="1" />
            Tuesday
          </label>
          <label>
            <input type="checkbox" value="2" />
            Wednesday
          </label>
          <label>
            <input type="checkbox" value="3" />
            Thursday
          </label>
          <label>
            <input type="checkbox" value="4" />
            Friday
          </label>
          <label>
            <input type="checkbox" value="5" />
            Saturday
          </label>
          <label>
            <input type="checkbox" value="6" />
            Sunday
          </label>
        </div>
        <p className="text">time</p>
        <div className="timepicker" id="timeForDaysOfWeek">
          <label>
            <input type="checkbox" value="6" />
            6:00 am - 7:00 am
          </label>
          <label>
            <input type="checkbox" value="7" />
            7:00 am - 8:00 am
          </label>
          <label>
            <input type="checkbox" value="8" />
            8:00 am - 9:00 am
          </label>
          <label>
            <input type="checkbox" value="9" />
            9:00 am - 10:00 am
          </label>
          <label>
            <input type="checkbox" value="15" />
            3:00 pm - 4:00 pm
          </label>
          <label>
            <input type="checkbox" value="16" />
            4:00 pm - 5:00 pm
          </label>
          <label>
            <input type="checkbox" value="17" />
            5:00 pm - 6:00 pm
          </label>
          <label>
            <input type="checkbox" value="18" />
            6:00 pm - 7:00 pm
          </label>
          <label>
            <input type="checkbox" value="19" />
            7:00 pm - 8:00 pm
          </label>
          <label>
            <input type="checkbox" value="20" />
            8:00 pm - 9:00 pm
          </label>
        </div>
        <button className="day-button" onClick={onClickButtonDay}>
          ➕ add selected range
        </button>
      </div>
      <div className="date-availablity">
        <p className="date-lelebhai">date</p>

        <div className="datepicker" id="date">
          <input
            type="text"
            className="date"
            placeholder="DD/MM/YYYY"
            name="date_slot"
            value={inputDate.date_slot}
            onChange={onInputChange}
            onBlur={validateInput}
          />
        </div>
        <p className="timefordate">time</p>
        <div className="timepicker" id="timeForDateOfWeek">
          <label>
            <input type="checkbox" value="6" />
            6:00 am - 7:00 am
          </label>
          <label>
            <input type="checkbox" value="7" />
            7:00 am - 8:00 am
          </label>
          <label>
            <input type="checkbox" value="8" />
            8:00 am - 9:00 am
          </label>
          <label>
            <input type="checkbox" value="9" />
            9:00 am - 10:00 am
          </label>
          <label>
            <input type="checkbox" value="15" />
            3:00 pm - 4:00 pm
          </label>
          <label>
            <input type="checkbox" value="16" />
            4:00 pm - 5:00 pm
          </label>
          <label>
            <input type="checkbox" value="17" />
            5:00 pm - 6:00 pm
          </label>
          <label>
            <input type="checkbox" value="18" />
            6:00 pm - 7:00 pm
          </label>
          <label>
            <input type="checkbox" value="19" />
            7:00 pm - 8:00 pm
          </label>
          <label>
            <input type="checkbox" value="20" />
            8:00 pm - 9:00 pm
          </label>
        </div>
        <button className="date-button" onClick={onClickButtonDate}>
          ➕ add selected range
        </button>
      </div>
      <div className="date start">
        <p>added date(s)</p>
      </div>
      <div className="added-dates">
        <ul>
          <li>
            <div className="wrapper1">
              <span>date/day</span>
              <span>time slots</span>
            </div>
          </li>
          {message.map((msg) => (
            <li className="dateitem">
              <div className="wrapper2">
                <div className="blue">
                  <p>
                    <span>
                      {msg.day_vector.every((element) => element === 0)
                        ? msg.date_slot
                        : getDaysOfWeek(msg.day_vector)}{" "}
                    </span>
                  </p>
                </div>
                <div className="red">
                  <p>
                    {msg.day_vector.every((element) => element === 0)
                      ? msg.date_slot_time_vector
                          .map((element, index) =>
                            element === 1 ? getTimeSlot(index) : ""
                          )
                          .filter((str) => str !== "")
                          .join(", ")
                      : msg.hour_vector
                          .map((element, index) =>
                            element === 1 ? getTimeSlot(index) : ""
                          )
                          .filter((str) => str !== "")
                          .join(", ")}
                  </p>
                </div>
              </div>
              {/* <Dateitems
                    isDay={!msg.day_vector.every(element => element === 0)}
                    dateOrDay={msg.day_vector.every(element => element === 0) ? msg.date_slot : getDaysOfWeek(msg.day_vector)}
                    timeSlots = {msg.day_vector.every(element => element === 0) ? msg.date_slot_time_vector.map((element, index) => (element === 1 ? getTimeSlot(index) : "")).filter((str) => str !== "").join(", ") : msg.date_slot_time_vector.map((element, index) => (element === 1 ? getTimeSlot(index) : "")).filter((str) => str !== "").join(", ")}
              /> */}
            </li> // Adjust based on your data structure
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Availability;
