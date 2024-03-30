import { useState, useEffect } from "react";
import React from "react";
import "./page2.css"; // Import the CSS file
import Button from "./button";
import SERVER_ROOT_PATH from "../../../../config";

function page2() {
  let user_id = localStorage.getItem("userMongoId");
  let [counsellorUsername, setCounsellorUsername] = useState("");
  let [counsellorOptions, setCounsellorOptions] = useState([]);
  let [selectedDate, setSelectedDate] = useState("");
  let [daysDates, setDaysDates] = useState([]);
  let [selectedTime, setSelectedTime] = useState();
  let [timeSlots, setTimeSlots] = useState([]);
  let [selectedProgram, setSelectedProgram] = useState("");
  let [selectedHall, setSelectedHall] = useState();
  let [department, setDepartment] = useState("");
  let [contactNumber, setContactNumber] = useState("");

  // selectedProgram = "Btech";
  // selectedHall = 1;
  // department = "CSE";
  // contactNumber = 0;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH + "/user/institute_counsellors"
        );
        const data = await response.json();
        const options = data.message.map((counsellor) => counsellor[0]);
        setCounsellorOptions(options);
      } catch (error) {
        console.error("Error fetching counsellors:", error);
      }
    }

    fetchData();
  }, []);

  const fillDaysDates = async (counsellorUsername) => {
    if (counsellorUsername === "") {
    } else {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH + "/user/get_available_days",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ counsellor_username: counsellorUsername }),
          }
        );
        const data = await response.json();
        console.log(data);
        const daysDatesOptions = data.message.map((dayDate) => dayDate);
        setDaysDates(daysDatesOptions);
      } catch (error) {
        console.error("Error occurred:", error);
        throw error;
      }
    }
  };

  const fillTimeSlots = async (counsellorUsername, selectedDate) => {
    if (selectedDate === "") {
    } else {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH + "/user/get_available_time_slots",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              counsellor_username: counsellorUsername,
              date: selectedDate,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        const timeSlotsOptions = data.message.map((timeSlot) => timeSlot);
        setTimeSlots(timeSlotsOptions);
      } catch (error) {
        console.error("Error occurred:", error);
        throw error;
      }
    }
  };

  function containsOnlyDigits(str) {
    return /^\d+$/.test(str);
  }

  const bookAppointment = async () => {
    if (
      counsellorUsername === "" ||
      selectedDate === "" ||
      selectedTime === "" ||
      selectedProgram === "" ||
      department === "" ||
      selectedHall === "" ||
      contactNumber === ""
    ) {
      alert("Please fill all the fields.");
    } else if (
      contactNumber.length !== 10 ||
      isNaN(contactNumber) ||
      contactNumber.charAt(0) === "0" ||
      !containsOnlyDigits(contactNumber)
    ) {
      alert("Please enter a valid contact number.");
    } else {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH + "/user/book_counsellor_appointment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user_id,
              counsellor_username: counsellorUsername,
              date: selectedDate,
              time: selectedTime,
              program: selectedProgram,
              department: department,
              hall: selectedHall,
              contact_number: contactNumber,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        alert(
          "Appointment booked successfully. Please await confirmation of booking from the counsellor."
        );
      } catch (error) {
        console.error("Error occurred:", error);
        throw error;
      }
    }
  };

  return (
    <div id="page" className="page-container">
      {/* Counsellor sec */}
      <div className="sec">
        <p className="labelsCounsellorPage">counsellor</p>
        <select
          value={counsellorUsername}
          onChange={(e) => {
            setCounsellorUsername(e.target.value);
            fillDaysDates(e.target.value);
          }}
          className="inputCounsellorPage"
        >
          <option value="" selected>
            Select counsellor name
          </option>
          {counsellorOptions.map((counsellor) => (
            <option key={counsellor}>{counsellor}</option>
          ))}
        </select>
      </div>

      {/* Date of appointment sec */}
      <div className="sec">
        <p className="labelsCounsellorPage">date/day of appointment</p>
        <select
          value={selectedDate}
          onClick={(e) => {
            setSelectedDate(e.target.value);
            fillTimeSlots(counsellorUsername, e.target.value);
          }}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            fillTimeSlots(counsellorUsername, e.target.value);
          }}
          className="inputCounsellorPage"
        >
          <option value="" selected>
            Select day/date
          </option>
          {daysDates.map((dayDate) => (
            <option key={dayDate}>{dayDate}</option>
          ))}
        </select>
      </div>

      {/* Preferred time sec */}
      <div className="sec">
        <p className="labelsCounsellorPage">preferred time</p>
        <select
          value={selectedTime}
          onChange={(e) => {
            setSelectedTime(e.target.value);
          }}
          className="inputCounsellorPage"
          defaultValue="3pm"
        >
          <option value="" selected>
            Select time slot
          </option>
          {timeSlots.map((timeSlot) => (
            <option key={timeSlot}>{timeSlot}</option>
          ))}
        </select>
      </div>

      {/* Program, Department, Hall sec */}
      <div className="sec">
        <p className="labelsCounsellorPage">program:</p>
        <select
          value={selectedProgram}
          onChange={(e) => {
            setSelectedProgram(e.target.value);
          }}
          className="inputCounsellorPage"
        >
          <option value="" selected>
            Select program
          </option>
          <option key="BTech">BTech</option>
          <option key="MTech">MTech</option>
          <option key="PhD">PhD</option>
          <option key="MSc">MSc</option>
          <option key="BSc">BSc</option>
        </select>
      </div>
      <div className="sec">
        <p className="labelsCounsellorPage" >
          department:
        </p>
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
          className="inputCounsellorPage"
        >
          <option value="" selected>
            Select department
          </option>
          <option key="CSE">CSE</option>
          <option key="EE">EE</option>
          <option key="MECH">Mechanical</option>
          <option key="MSE">Material Science and Enginnering</option>
          <option key="MTH">MTH</option>
          <option key="SDS">SDS</option>
          <option key="Earth_Science">Earth Science</option>
          <option key="AERO">Aerospace</option>
          <option key="ECO">Economics</option>
          <option key="BSBE">Biological Sciences and Bioengineering</option>
          <option key="PHY">Physics</option>
          <option key="CHE">Chemistry</option>
          <option key="DES">Design</option>
          <option key="HSS">Humanities and Social Sciences</option>
          <option key="CHEM">Chemical</option>
        </select>
        </div>
        <div className="sec">
        <p className="labelsCounsellorPage">
          hall:
        </p>
        <select
          value={selectedHall}
          onChange={(e) => {
            setSelectedHall(e.target.value);
          }}
          className="inputCounsellorPage"
        >
          <option value="" selected>
            Select hall
          </option>
          <option key="1">1</option>
          <option key="2">2</option>
          <option key="3">3</option>
          <option key="4">4</option>
          <option key="5">5</option>
          <option key="6">6</option>
          <option key="7">7</option>
          <option key="8">8</option>
          <option key="9">9</option>
          <option key="10">10</option>
          <option key="11">11</option>
          <option key="12">12</option>
          <option key="13">13</option>
          <option key="14">14</option>
        </select>
      </div>

      {/* Contact number sec */}
      <div className="sec">
        <p className="labelsCounsellorPage">contact number</p>
        <input
          type="text"
          className="inputCounsellorPage"
          onChange={(e) => {
            setContactNumber(e.target.value);
          }}
        />
      </div>

      {/* Save button */}
      <div className="button-container">
        <button
          backgroundColor={"#22992E"}
          size={3}
          value="book"
          textColor={1}
          onClick={bookAppointment}
          className="counsellor_page_user_button"
        >
          book
        </button>
      </div>
    </div>
  );
}

export default page2;
