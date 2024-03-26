import React,{useState} from "react";
import "./get_slots_pool.css";
import SERVER_ROOT_PATH from "../../../../../config";


const validateTransactionId = (upiId) => {
  const upiIdPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the provided UPI ID matches the pattern
    if (upiId.match(upiIdPattern)) {
        return true; // UPI ID is valid
    } else {
        return false; // UPI ID is invalid
    }
};
const get_slots = () => {

  const [transactionId, setTransactionId] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const handleApply = async () => {
    // Validate transaction ID and selected time slot
    if (!validateTransactionId(transactionId)) {
      alert("Please enter a valid transaction ID.");
      return;
    }

    if (selectedTimeSlot.trim() === "") {
      alert("Please select a time slot.");
      return;
    }
    const bookingRes =  await fetch(
      SERVER_ROOT_PATH + "/gym/swim_booking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time_slot: selectedTimeSlot,
        user_id: localStorage.getItem("userMongoId"),
        month: new Date().getMonth()+1,
        year: new Date().getFullYear(), // <-- You missed the parentheses here
        time: new Date(),
        type: 1,
        }),
      }
    );

    if (bookingRes.ok) {
      alert("Booking successful!");
          // Reset form
          setTransactionId("");
          setSelectedTimeSlot("");
      // Reset form after successful submission

      // Show alert for successful booking
    } else {
      const errorMessage = await bookingRes.json();
      if (errorMessage.error === "You have already booked this slot.") {
        alert("You have already applied for this slot.");
      } else if (errorMessage.error ==="Maximum capacity for this slot has been reached."){
        alert("Sorry......Maximum capacity for this slot has been reached. Try another slot or please come next time.");
      }
      else {
        alert("An error occurred. Please try again later.");
      }
      setTransactionId("");
      setSelectedTimeSlot("");
    }
  };

    var monthNames = ["january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];
    var currentDate = new Date();

    // Get the month (0-indexed, meaning January is 0, February is 1, and so on)
    var currentMonth = currentDate.getMonth();

  return (
    <div className="dataa"> 
    <div className="Subscribe">

      <div className="title">
        <h3>bookings are open for the month of {monthNames[currentMonth]}</h3>
      </div>


      <div className="time-slot">
          <h3 className="label">time-slot</h3>
          <select className="pool-drop-down"
              style={{ width: "200px" }}
              value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}>
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
        <h3>charges</h3>
        <div className="prices">
          <h3> Rs.350 (males)</h3>
          <h3> Rs.345 (females)</h3>
        </div>
      </div>

      
      <div className="paid">
        <h3>paid</h3>
        <input type="text" placeholder="transaction ID" value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}></input>
      </div>
      <div className="apply">
        <button className="applybutton" onClick={handleApply}>
          apply
        </button>
      </div>
    </div>
    </div>
  );
};

export default get_slots