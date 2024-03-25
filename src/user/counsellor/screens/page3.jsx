import { useState, useEffect } from "react";
import Table from "./table copy";
import React from 'react'
import Button from "./button";
import "./page3.css";


const page3 = () => {
  const [message, setMessage] = useState("");
  const fetchInfo = async() => {
    return await fetch("http://localhost:6300/user/counsellor_page_user_3")
    .then(response => response.json())
    .then(data => setMessage(data.message));
  };
  useEffect(() => {
    fetchInfo();
    console.log(message);
  }, []);
  return (
    <Table noOfRows={message.length} noOfColumns={4} rowEntries={message}/>
  )
}


export default page3