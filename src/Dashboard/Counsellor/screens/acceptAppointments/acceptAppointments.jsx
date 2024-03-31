import React from "react";
import Table1 from "../table/Table1";
import Table2 from "../table/Table2";
import "./acceptAppointments.css";
import { useState } from "react";
import { useEffect } from "react";
import SERVER_ROOT_PATH from "../../../../../config";

const AcceptAppointments = () => {
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
  const [message, setMessage] = useState([]);
  const [upcomingAppointments, SetUpcomingAppointments] = useState([]);
  const [pendingAppointments, SetPendingAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          SERVER_ROOT_PATH + "/counsellor/getAppointments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              counsellor_user_id: localStorage.getItem("userMongoId"),
            }),
          }
        );
        const data = await response.json();
        setMessage(data.message);

        const today = new Date();
        SetUpcomingAppointments(
          data.message.filter(msg => {
            const [day, month, year] = msg.date_slot.split('/');
            const appointmentDate = new Date(year, month - 1, day); // month - 1 because months are zero-based in JavaScript
            return appointmentDate > today && msg.booking_status === 1;
        })
        );
        SetPendingAppointments(
          data.message.filter((msg) => msg.booking_status === 0)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const sendData = async (isAccept, Appointment) => {
    try {
      const response = await fetch(
        SERVER_ROOT_PATH + "/counsellor/acceptAppointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // You may need to include additional headers if required by your backend
          },
          body: JSON.stringify({
            isAccept: isAccept,
            appointment_id: Appointment.booking_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      // Assuming your backend returns a response indicating success or failure
    } catch (error) {
      console.error("Error accpeting/rejecting:", error);
      throw error;
    }
  };

  const onClickButton = async (isAccept, currAppointment) => {
    // isAccept is 1 for accepting and -1 for rejecting
    // here if the appointment is being accepted, we reject the other appointments
    if (isAccept === 1) {
      sendData(1, currAppointment);
      pendingAppointments.forEach((appointment) => {
        if (
          appointment.date_slot === currAppointment.date_slot &&
          appointment.time_slot === currAppointment.time_slot &&
          appointment.booking_id !== currAppointment.booking_id
        ) {
          // Update the appointment as needed
          sendData(-1, appointment);
        }
      });
      console.log("button pressed");
    } else {
      sendData(-1, currAppointment);
      console.log("button pressed");
    }
  };
  // const onClickButton = async (isAccept, currAppointment) => {
  //   // isAccept is 1 for accepting and -1 for rejecting
  //   // here if the appointment is being accepted, we reject the other appointments
  //   if (isAccept === 1) {
  //     pendingAppointments.forEach((appointment) => {
  //       if (
  //         appointment.date_slot === currAppointment.date_slot &&
  //         appointment.time_slot === currAppointment.time_slot
  //       ) {
  //         // Update the appointment as needed
  //         onClickButton(-1, appointment);
  //       }
  //     });
  //   }
  //   console.log("button pressed");
  //   try {
  //     const response = await fetch(
  //       SERVER_ROOT_PATH + "/counsellor/acceptAppointments",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // You may need to include additional headers if required by your backend
  //         },
  //         body: JSON.stringify({
  //           isAccept: isAccept,
  //           appointment_id: currAppointment.booking_id,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     return data;
  //     // Assuming your backend returns a response indicating success or failure
  //   } catch (error) {
  //     console.error("Error accpeting/rejecting:", error);
  //     throw error;
  //   }
  // };

  return (
    <div className="Acceptappointments">
      <div className="table1">
        <Table2
          noOfColumns={6}
          noOfRows={1 + pendingAppointments.length}
          // noOfRows={1 + upcomingAppointments.length}
          rowEntries={[
            ["name", "time", "date", "action", " "],
            ...pendingAppointments.map((msg) => [
              msg.username,
              getTimeSlot(msg.time_slot),
              msg.date_slot,
              <button
                className="accept-button"
                onClick={() => onClickButton(1, msg)}
              >
                Accept
              </button>,
              <button
                onClick={() => onClickButton(-1, msg)}
                className="reject-button"
              >
                Reject
              </button>,
            ]),
          ]}
        ></Table2>
      </div>
      <div className="table2">
        <Table1
          noOfColumns={3}
          noOfRows={1 + upcomingAppointments.length}
          // noOfRows={1 + upcomingAppointments.length}
          rowEntries={[
            ["name", "time", "date"],
            ...upcomingAppointments.map((msg) => [
              msg.username,
              getTimeSlot(msg.time_slot),
              msg.date_slot,
            ]),
          ]}
        ></Table1>
      </div>
    </div>
  );
};

export default AcceptAppointments;
