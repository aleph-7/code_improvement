import { useEffect, useState } from "react";
import Table_Tutorial from "./table_tutorials.jsx";
import "./tutorial.css";
import SERVER_ROOT_PATH from "../../../../config.js";

function Tutorial({ sport }) {
  const [message, setMessage] = useState("");
  const fetchInfo = async () => {
<<<<<<< HEAD:src/user/components/tutorials/tutorial.jsx
    return await fetch(SERVER_ROOT_PATH + "/tutorials/" + sport)
=======
    return await fetch("http://localhost:6300/tutorials/gym")
>>>>>>> main:src/user/gym/screens/tutorial/tutorial.jsx
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
