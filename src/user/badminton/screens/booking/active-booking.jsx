import React, { useState,useEffect } from "react";
import "./subbooking.css";
import SERVER_ROOT_PATH from "../../../../../config";


function fetchAvailableSlots(date, typeOfSport,cap) {
  return fetch(`${SERVER_ROOT_PATH}/getAvailableSlots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date:date, type_of_sport: typeOfSport ,capacity:cap}),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }
      return response.json();
    })
    .then((data) => data.availableSlots)
    .catch((error) => {
      console.error("Error fetching available slots:", error);
      return [];
    });
}




function ActiveBooking() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const userid = localStorage.getItem("userMongoId");
  const [selectedTime, setSelectedTime] = useState("");
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  var date = new Date();
  const current_date = (date.getDate() < 10 ? "0" : "") + date.getDate() + "-" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "-" +date.getFullYear(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if users list is empty
    if (users.length === 0) {
      alert("Please add at least one playmate!");
      return;
    }

    const res = await fetch(`${SERVER_ROOT_PATH}/checkAppliedTimeslots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("userMongoId"),
        selectedTime: selectedTime,
      }),
    });

    const data = await res.json();

    if (data.alreadyApplied) {
      alert("You have already applied for this timeslot!");
      return;
    }

    const bookingRes = await fetch(
      SERVER_ROOT_PATH + "/badminton/active_booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: selectedTime,
          type: "active",
          players: users,
          user_id: userid,
          sport_type: "badminton",
        }),
      }
    );

    if (bookingRes.ok) {
      e.target.reset();
      alert("Booking successful!");
      setSelectedTime("");
      setUsers([]);
      setInputValue("");
      setAllowPlayerSelection(false);
      setShowWarning(false);
    } else {
      const errorMessage = await bookingRes.json();
      if (errorMessage.error === "Court is full") {
        alert("Court is full. Please select another timeslot.");
      } else {
        alert("Booking failed. Please try again.");
      }
      setSelectedTime("");
      setUsers([]);
      setInputValue("");
      setAllowPlayerSelection(false);
      setShowWarning(false);
    }
  };


  useEffect(() => {
    async function fetchData() {
      const slots = await fetchAvailableSlots(current_date, "badminton",6);
      setAvailableSlots(slots);
    }
    fetchData();
  }, []);
  

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
    
    if (selectedValue === "") {
      const current_date = getFormattedDate();
      const slots = await fetchAvailableSlots(current_date, "badminton",6);
      setAvailableSlots(slots);
    }
  };

  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = async () => {
    const loggedInUsername = localStorage.getItem("userId");

    if (inputValue === loggedInUsername) {
      // Alert the user that they cannot add themselves
      alert("You cannot add yourself to the list.");
      setInputValue("");
      return;
    }

    if (inputValue.trim() !== "") {
      const response = await fetch(
        `${SERVER_ROOT_PATH}/checkUser/${inputValue}`
      );
      const data = await response.json();

      if (data.exists) {
        if (users.length < 4) {
          setUsers([...users, inputValue]);
          setInputValue("");
        } else {
          setShowWarning(true);
        }
      } else {
        setInputValue("");
        alert("User doesn't exist!");
      }
    }
  };

  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  return (
    <form
      className="active-booking-form-badminton"
      onSubmit={(e) => {
        handleSubmit(e);
        e.target.reset();
      }}
    >
      <div className="booking-area">
        <div className="play-area">
          <div className="drop">
            <p className="labeeels">Time-Slot</p>
            <select
              className="drop-down"
              style={{ width: "200px" }}
              value={selectedTime}
              onChange={handleSelectChange}
            >
              <option value="">select a time slot</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}:00 - {parseInt(slot) + 1}:00
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="select">
          <p className="labeeels">Select Playmate(s)</p>

          <div>
            <div className="players-list">
              <div>
                <input
                  className="show_cont"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <button
                  onClick={handleAddUser}
                  className="redButton"
                  type="button"
                >
                  Add User
                </button>
              </div>
            </div>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
            {showWarning && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={handleCloseWarning}>
                    &times;
                  </span>
                  <p>Maximum number of entries reached!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="buttonContainer">
          <button
            className="orangeButtonnn"
            onClick={() => setUsers([])}
            type="button"
          >
            Clear
          </button>
          <button className="greenButtonnn">Apply</button>
          <br />
        </div>
      </div>
    </form>
  );
}

export default ActiveBooking;
