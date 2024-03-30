import React, { useState } from "react";
import "./subbooking.css";
import SERVER_ROOT_PATH from "../../../../../config";

function PreBooking() {
  const [data, setData] = useState({});
  const [selectedTime, setSelectedTime] = useState("");
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [allowPlayerSelection, setAllowPlayerSelection] = useState(false);
  var date = new Date();
  const current_date = (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "/" +date.getFullYear(); 


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const userid = localStorage.getItem("userMongoId");
  const sport = localStorage.getItem("type_of_sport");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allowPlayerSelection && users.length === 0) {
      alert("Please add at least one playmate!");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time slot!");
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
      SERVER_ROOT_PATH + "/pre_booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: selectedTime,
          type: "pre",
          players: users,
          user_id: userid,
          sport_type: "badminton",
        }),
      }
    );

    if (bookingRes.ok) {
      e.target.reset();
      alert("You successfully applied for court booking.");
      setSelectedTime("");
      setUsers([]);
      setInputValue("");
      setAllowPlayerSelection(false);
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

  const handleSelectChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const handleAddUser = async () => {
    if (!selectedTime) {
      alert("Please select a time slot!");
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
          type: 0
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
              style={{ width: "200px",marginTop:"2vh" }}
              value={selectedTime}
              onChange={handleSelectChange}
              > <option value="">select a time slot</option>
              <option value="6">6:00 - 7:00</option>
              <option value="7">7:00 - 8:00</option>
              <option value="8">8:00 - 9:00</option>
              <option value="16">16:00 - 17:00</option>
              <option value="17">17:00 - 18:00</option>
              <option value="18">18:00 - 19:00</option>
              <option value="19">19:00 - 20:00</option>
              <option value="20">20:00 - 21:00</option>
            </select>
          </div>
        </div>
        <div className="select">
          <p className="labeeels">Select Playmate(s)</p>
          <div className="pre-check">
            <input
              type="checkbox"
              checked={allowPlayerSelection}
              onChange={() => setAllowPlayerSelection(!allowPlayerSelection)}
            />
            <label>Allow Player Selection</label>
          </div>
          <div>
            {allowPlayerSelection && (
              <>
                <div className="players-list">
                  <div >
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
              </>
            )}
          </div>
        </div>
        {/* </div> */}
        <div className="buttonContainer">
          <button
            className="orangeButtonnn"
            onClick={() => setUsers([])}
            type="button"
          >
            Clear
          </button>
          <button className="greenButtonnn" type="submit">
            Apply
          </button>
          <br />
        </div>
      </div>
    </form>
  );
}

export default PreBooking;
