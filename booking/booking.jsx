import React, { useState } from "react";
import "./booking.css";
import Prebooking from "./pre-booking";
import ActiveBooking from "./active-booking";

function BookingApp() {
  const [activeBooking, setActiveBooking] = useState(true);

  const prebook = () => {
    setActiveBooking(false);
    console.log(activeBooking);
  };

  const activebook = () => {
    setActiveBooking(true);
    console.log(activeBooking);
  };

  return (
    <div className="booking">
      <ul className="booking-options">
        <li>
          <button
            onClick={prebook}
            style={activeBooking ? null : buttonpressed}
          >
            pre-booking
          </button>
        </li>
        <li>
          <button
            onClick={activebook}
            style={activeBooking ? buttonpressed : null}
          >
            active booking
          </button>
        </li>
      </ul>
      <div className="booking_form">
        {!activeBooking ? <Prebooking /> : <ActiveBooking />}
      </div>
    </div>
  );
}
const buttonpressed = {
  background: "#EF3E3E",
  color: "white",
};
export default BookingApp;
