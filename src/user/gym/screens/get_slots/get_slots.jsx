import React, { useState } from "react";
import "./get_slots.css";
import SERVER_ROOT_PATH from "../../../../../config";
import { Link } from "react-router-dom";

function validateReferenceNumber(referenceNumber) {
  // Define the pattern for the reference number
  const referenceNumberPattern = /^[A-Za-z]{3}\d{7}$/;

  // Check if the provided reference number matches the pattern
  return referenceNumberPattern.test(referenceNumber);
}

const get_slots = () => {
  const [refId, setRefId] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const isBookingOpen = () => {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const bookingDeadline = 30; // Bookings are closed after the 20th of every month
    return currentDayOfMonth <= bookingDeadline;
  };

  const handleApply = async () => {
    // Validate transaction ID and selected time slot
    if (!validateReferenceNumber(refId)) {
      alert("Please enter the correct reference number.");
      return;
    }

    if (selectedTimeSlot.trim() === "") {
      alert("Please select a time slot.");
      return;
    }
    const bookingRes = await fetch(SERVER_ROOT_PATH + "/gym/swim_booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time_slot: selectedTimeSlot,
        user_id: localStorage.getItem("userMongoId"),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(), // <-- You missed the parentheses here
        time: new Date(),
        type: 0,
      }),
    });

    if (bookingRes.ok) {
      alert("Booking successful!");
      // Reset form
      setRefId("");
      setSelectedTimeSlot("");
      // Reset form after successful submission

      // Show alert for successful booking
    } else {
      const errorMessage = await bookingRes.json();
      if (errorMessage.error === "You have already booked this slot.") {
        alert("You have already booked a slot for this month.");
      } else if (
        errorMessage.error ===
        "Maximum capacity for this slot has been reached."
      ) {
        alert(
          "Sorry......Maximum capacity for this slot has been reached. Try another slot or please come next time."
        );
      } else {
        alert("An error occurred. Please try again later.");
      }
      setRefId("");
      setSelectedTimeSlot("");
    }
  };

  var monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  var currentDate = new Date();

  // Get the month (0-indexed, meaning January is 0, February is 1, and so on)
  var currentMonth = currentDate.getMonth();

  return (
    <div className="dataa">
      <div className="Subscribe">
        <div className="title">
          <h3>
            {isBookingOpen()
              ? `Bookings are open for the month of ${monthNames[currentMonth]}`
              : `Bookings are closed for the month of ${monthNames[currentMonth]}. Please try again next month.`}
          </h3>
        </div>

        {isBookingOpen() ? (
          <>
            <div className="time-slot">
              <h3 className="label">time-slot</h3>
              <select
                className="gym-drop-down"
                style={{ width: "200px" }}
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              >
                <option value="">select a time slot</option>
                <option value="6:00 - 7:00">6:00 - 7:00</option>
                <option value="7:00 - 8:00">7:00 - 8:00</option>
                <option value="8:00 - 9:00">8:00 - 9:00</option>
                <option value="16:00 - 17:00">16:00 - 17:00</option>
                <option value="17:00 - 18:00">17:00 - 18:00</option>
                <option value="18:00 - 19:00">18:00 - 19:00</option>
                <option value="19:00 - 20:00">19:00 - 20:00</option>
                <option value="20:00 - 21:00">20:00 - 21:00</option>
              </select>
            </div>

            <div className="charges">
              <div>
                <h3>wanna join the gym??</h3>
                <h3>click on the link ahead to get the membership</h3>
              </div>

              <button className="SBIcollect">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm"
                >
                  Click here to pay fees
                </Link>
              </button>
            </div>

            <div className="paid">
              <div>
                <h3>paid ?</h3>
                <h3>Enter the SBCollect Reference Number</h3>
              </div>
              <input
                type="text"
                placeholder="Reference Number"
                value={refId}
                onChange={(e) => setRefId(e.target.value)}
              />
            </div>

            <div className="apply">
              <button className="applybutton" onClick={handleApply}>
                apply
              </button>
            </div>
          </>
        ) : (
          <div className="booking-closed">
            <p style={{ textAlign: "center" }}>
              Bookings are closed after the 20th of every month.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default get_slots;
