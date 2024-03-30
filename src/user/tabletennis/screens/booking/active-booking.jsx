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
  const [availableCourts, setAvailableCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState("");
  var date = new Date();
  const current_date = (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "/" +date.getFullYear(); 

  useEffect(() => {
    async function fetchData() {
    const currentHour = date.getHours();
    const slotsData = await fetchAvailableSlots(current_date, "table_tennis", 6);
    const slots = slotsData.map(Number);
    const filteredSlots = slots.filter(slot => Number(slot) > currentHour);
    setAvailableSlots(filteredSlots);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchCourts() {
      // Fetch available courts based on the selected time slot
      if (selectedTime) {
        const response = await fetch(`${SERVER_ROOT_PATH}/getAvailableCourts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedTime: selectedTime,date:current_date,sport:"table_tennis" }),
        });
        const data = await response.json();
        setAvailableCourts(data.availableCourts);
      }
    }
    fetchCourts();
  }, [selectedTime]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if users list is empty
    if (users.length === 0) {
      alert("Please add at least one playmate!");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time slot!");
      return;
    }

    if (!selectedCourt) {
      alert("Please select a court!");
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
      SERVER_ROOT_PATH + "/active_booking",
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
          sport_type: "table_tennis",
          court_id: selectedCourt,
        }),
      }
    );

    if (bookingRes.ok) {
      e.target.reset();
      alert("Booking successful!");
      setSelectedTime("");
      setUsers([]);
      setInputValue("");
      setShowWarning(false);
    } else {
      const errorMessage = await bookingRes.json();
      if (errorMessage.error === "Court is full") {
        alert("Court is full. Please select another timeslot.");
      } else if(errorMessage.error === "You have applied for some other booking at this time."){
        alert("You have applied for some other booking at this time.");
      }
      else{
        alert("Booking failed. Please try again.");
      }
      setSelectedTime("");
      setUsers([]);
      setInputValue("");
      setShowWarning(false);
    }
  };


  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
    setSelectedCourt("");
    
    if (selectedValue === "") {
      const current_date = getFormattedDate();
      const slots = await fetchAvailableSlots(current_date, "table_tennis",6);
      setAvailableSlots(slots);
    }else {
      // Clear the previous court list
      setAvailableCourts([]);
    }
  };

  const handleCourtChange = (event) => {
    setSelectedCourt(event.target.value);
  };


  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddUser = async () => {
    if (!selectedTime) {
      alert("Please select a time slot!");
      return;
    }

    if (!selectedCourt) {
      alert("Please select a court!");
      return;
    }
    const loggedInUsername = localStorage.getItem("userId");

    if (inputValue === loggedInUsername) {
      // Alert the user that they cannot add themselves
      alert("You cannot add yourself to the list.");
      setInputValue("");
      return;
    }

    if (inputValue.trim() !== "") {
      const response = await fetch(
        SERVER_ROOT_PATH +"/checkUser",
        {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: inputValue,
          date : current_date,
          time_slot: selectedTime,
          type: 1
        })
        }
      );
      const data = await response.json();

      if (data.message==="User is available for booking") {
        if (users.length < 3) {
          setUsers([...users, inputValue]);
          setInputValue("");
        } else {
          alert("Maximum number of entries reached!");
        }
      } else if(data.message==="User is already booked for this slot"){
        setInputValue("");
        alert("He/she has some other booking at this slot.");
      }
      else if(data.message === "User not found"){
        setInputValue("");
        alert("This user doesn't exist.");
      }
      else {
        setInputValue("");
        alert("Something went wrong..");
      }
    }
  };

  
  return (
    <form
      className="active-booking-form-table_tennis"
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
              style={{ width: "200px",marginTop:"2vh" }}
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
        <div className="play-area">
        <div className="drop">
          <p className="labeeels">Select Court</p>
          <select
            className="drop-down"
            style={{ width: "200px",marginTop:"2vh"}}
            value={selectedCourt}
            onChange={handleCourtChange}
          >
            <option value="">select a court</option>
            {selectedTime && availableCourts.map((court) => (
              <option key={court._id} value={court._id}>
                {court.court_name}
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
