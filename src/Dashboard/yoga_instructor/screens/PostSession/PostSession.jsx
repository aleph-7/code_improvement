import React, { useState } from "react";
import "./PostSession.css";
import SERVER_ROOT_PATH from "../../../../../config";

function PostSession() {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [batchsize, setBatchsize] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  function containsOnlyIntegers(str) {
    return /^\d+$/.test(str);
  }

  const validateBatchsize = (batchsize) => {
    if (batchsize === "") {
      alert("Batch size cannot be empty");
    } else if (!containsOnlyIntegers(batchsize)) {
      alert("Batch size should contain only integers");
      return false;
    } else if (parseInt(batchsize) < 1) {
      alert("Batch size should be greater than 0");
      return false;
    } else if (parseInt(batchsize) > 100) {
      alert("Batch size should be less than 100");
      return false;
    }
    return true;
  };

  const dayDifference = (date1, date2) => {
    let dateArray1 = date1.split("-").map((x) => parseInt(x));
    let dateArray2 = date2.split("-").map((x) => parseInt(x));
    let date1Obj = new Date(dateArray1[2], dateArray1[1] - 1, dateArray1[0]);
    let date2Obj = new Date(dateArray2[2], dateArray2[1] - 1, dateArray2[0]);
    let timeDifference = date2Obj.getTime() - date1Obj.getTime();
    let dayDifference = timeDifference / (1000 * 3600 * 24);
    return dayDifference;
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

  const postSession = () => {
    console.log(content, location, batchsize, date, startTime, endTime);
    if (content === "") {
      alert("Content cannot be empty");
      return;
    } else if (location === "") {
      alert("Location cannot be empty");
      return;
    } else if (!validateBatchsize(batchsize)) {
      return;
    } else if (!validateDate(date)) {
      return;
    } else if (endTime === undefined || startTime === undefined) {
      alert("Please select start and end time");
      return;
    } else if (Number(startTime) >= Number(endTime)) {
      console.log(startTime, endTime);
      alert("Start time should be less than end time");
      return;
    }
    try {
      const response = fetch(SERVER_ROOT_PATH + "/post_yoga_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yoga_instructor_id: localStorage.getItem("userMongoId"),
          content: content,
          location: location,
          batch_size: batchsize,
          date: date,
          start_time: startTime,
          end_time: endTime,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.message);
          window.location.reload();
        });
    } catch (error) {
      console.error("Error occurred:", error);
      throw error;
    }
  };

  return (
    <div className="yoga-postSession-container">
      <div className="input-container">
        <div>
          <h3>content:</h3>
          <input
            type="text"
            className="Yoga_Session_Content"
            placeholder="content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div>
          <h3>location:</h3>
          <input
            type="text"
            className="Yoga_Session_Location"
            placeholder="location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <h3>batch size:</h3>
          <input
            type="text"
            className="Yoga_Session_Batchsize"
            placeholder="batch size"
            name="batch_size"
            onChange={(e) => setBatchsize(e.target.value)}
          />
        </div>

        <div>
          <h3>date:</h3>
          <input
            type="text"
            className="Yoga_Session_Date"
            placeholder="start date (DD/MM/YYYY)"
            name="startDate"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <h3>start time:</h3>
          <select
            className="Yoga_Session_Start_Time"
            name="startTime"
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option value="" selected>
              Select start time
            </option>
            <option value="0">12 midnight</option>
            <option value="1">1 am</option>
            <option value="2">2 am</option>
            <option value="3">3 am</option>
            <option value="4">4 am</option>
            <option value="5">5 am</option>
            <option value="6">6 am</option>
            <option value="7">7 am</option>
            <option value="8">8 am</option>
            <option value="9">9 am</option>
            <option value="10">10 am</option>
            <option value="11">11 am</option>
            <option value="12">12 noon</option>
            <option value="13">1 pm</option>
            <option value="14">2 pm</option>
            <option value="15">3 pm</option>
            <option value="16">4 pm</option>
            <option value="17">5 pm</option>
            <option value="18">6 pm</option>
            <option value="19">7 pm</option>
            <option value="20">8 pm</option>
            <option value="21">9 pm</option>
            <option value="22">10 pm</option>
            <option value="23">11 pm</option>
          </select>

          <h3>end time:</h3>
          <select
            className="Yoga_Session_End_Time"
            name="endTime"
            onChange={(e) => setEndTime(e.target.value)}
          >
            <option value="" selected>
              Select end time
            </option>
            <option value="0">12 midnight</option>
            <option value="1">1 am</option>
            <option value="2">2 am</option>
            <option value="3">3 am</option>
            <option value="4">4 am</option>
            <option value="5">5 am</option>
            <option value="6">6 am</option>
            <option value="7">7 am</option>
            <option value="8">8 am</option>
            <option value="9">9 am</option>
            <option value="10">10 am</option>
            <option value="11">11 am</option>
            <option value="12">12 noon</option>
            <option value="13">1 pm</option>
            <option value="14">2 pm</option>
            <option value="15">3 pm</option>
            <option value="16">4 pm</option>
            <option value="17">5 pm</option>
            <option value="18">6 pm</option>
            <option value="19">7 pm</option>
            <option value="20">8 pm</option>
            <option value="21">9 pm</option>
            <option value="22">10 pm</option>
            <option value="23">11 pm</option>
          </select>
        </div>
        <div>
          <button onClick={postSession}>Post Session</button>
        </div>
      </div>
    </div>
  );
}

export default PostSession;
