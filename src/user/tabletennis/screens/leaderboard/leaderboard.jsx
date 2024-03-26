import React, { useState, useEffect } from "react";
import leaderboard from "../../../assets/leaderboard.png";
import "./leaderboard.css";
import SERVER_ROOT_PATH from "../../../../../config";

function Leaderboard() {
  const [searchUsername, setSearchUsername] = useState("");
  const [message, setMessage] = useState("");
  const fetchInfo = async () => {
    return await fetch(SERVER_ROOT_PATH + "/leaderboard/table_tennis")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .then(() => console.log(message));
  };
  useEffect(() => {
      fetchInfo();
  }, []);

  const searchUserByUsername = async () => {
    if(searchUsername.length==0)
    {
      fetchInfo();
      return;
    }
    try
    {
      return await fetch(SERVER_ROOT_PATH + "/leaderboard/table_tennis/selected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: searchUsername }),
      })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        console.log(data.message);
        console.log(data.message.length);
        if (data.message.length !== 1) {
          console.log("main aaya idhar");
          alert("User not found");
          fetchInfo();
        }
      });
    }
    catch(error){
      console.error('Error fetching user:', error);
    }
  }
  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(message).map(([name], index) => (
            <tr key={name}>
              {index < 3 ? (
                <td className="head-text">
                  <div className="head-image">
                    <img src={leaderboard} alt="leaderboard" />
                  </div>
                  <div className="text-on-image">
                    <p>{message[index][1]}.</p>
                  </div>
                </td>
              ) : (
                <td>{message[index][1]}</td>
              )}
              <td>{message[index][0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="TableTennisLeaderboardSearch">
        <h3>Search a player:</h3>
        <input type="text" placeholder="Enter player's username" onChange={(e) => {setSearchUsername(e.target.value); console.log(e.target.value)} }  defaultValue=""/>
        <button onClick={() => {searchUserByUsername();}} className="LeaderboardSearchButton">Search</button>
      </div>
    </div>
  );
}

export default Leaderboard;
