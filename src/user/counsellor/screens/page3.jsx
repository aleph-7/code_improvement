import { useState, useEffect } from "react";
import Table from "./table copy";
import React from 'react'
import Button from "./button";
import "./page3.css";


const page3 = () => {
  let user_id='65f75df31fb4f194727baada';
  const [message, setMessage] = useState("");
  const fetchInfo = async() => {
    try{
      const response = await fetch("http://localhost:6300/user/counsellor_page_user_3",
      {
        method:"POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user_id })
      });
      const data = await response.json();
      console.log(data);
      setMessage(data.message);
    }
    catch(error){
      console.error('Error fetching counsellors:', error);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <Table noOfRows={message.length} noOfColumns={4} rowEntries={message}/>
  )
}


export default page3