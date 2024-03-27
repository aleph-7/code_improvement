import React, { useState, useEffect } from "react";
import "./showpass.css";
import SERVER_ROOT_PATH from "../../../../../config";

const ShowPass = () => {
  const [membershipDetails, setMembershipDetails] = useState(null);
  const username = localStorage.getItem("userId");
  const userid = localStorage.getItem("userMongoId");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchMembershipDetails = async () => {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH +
            `/gym/swim_pass?userid=${userid}&year=${new Date().getFullYear()}&month=${
              new Date().getMonth() + 1
            }&type=0`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch membership details");
        }
        const data = await response.json();
        setMembershipDetails(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMembershipDetails();
  }, [userid]);

  return (
    <div className="Viewshow">
      <div className="wrapper">
        <h3>Gym Membership Details</h3>
        <div className="wrapper2">
          <div className="name">
            <p style={{ fontWeight: "bold" }}>Name:</p>
            <p>{username}</p>
          </div>
          <div className="month">
            <p style={{ fontWeight: "bold" }}>Valid for the month:</p>
            <p>
              {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
            </p>
          </div>
          <div className="timings">
            <p style={{ fontWeight: "bold", paddingTop: "0px" }}>Time-Slots:</p>
            {membershipDetails && membershipDetails.length > 0 ? (
              <ul style={{ paddingTop: "1.5%" }}>
                {membershipDetails.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            ) : (
              <p style={{ paddingTop: "1.0%" }}>
                you haven't booked any slot yet...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPass;
