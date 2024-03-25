import { useEffect, useState } from "react";
import Table_Tutorial from "../../../components/tutorials/table.jsx";
import "./tutorial.css";

function Tutorial() {
  const [message, setMessage] = useState("");
  const fetchInfo = async () => {
    return await fetch("http://localhost:6300/tutorials/gym")
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
