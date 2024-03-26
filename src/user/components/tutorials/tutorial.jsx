import { useEffect, useState } from "react";
import Table_Tutorial from "./table_tutorials.jsx";
import "./tutorial.css";
import SERVER_ROOT_PATH from "../../../../config.js";

function Tutorial({ sport }) {
  const [message, setMessage] = useState("");
  const fetchInfo = async () => {
    return await fetch(SERVER_ROOT_PATH + "/tutorials/" + sport)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="tutorial">
      <Table_Tutorial
        noOfRows={message.length}
        noOfColumns={3}
        rowEntries={message}
      />
    </div>
  );
}

export default Tutorial;
