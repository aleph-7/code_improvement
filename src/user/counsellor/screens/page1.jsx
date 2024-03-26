import {useState, useEffect} from 'react';
import Table from "./table";
import React from 'react'

const page1 = () => {
  const [message, setMessage] = useState("");
  const fetchInfo = async() => {
    return await fetch("http://localhost:6300/user/counsellor_page_user")
    .then(response => response.json())
    .then(data => setMessage(data.message));
  };
  useEffect(() => {
    fetchInfo();
    console.log(message);
  }, []);
  return (
    <Table noOfRows={message.length} noOfColumns={3} rowEntries={message}/>
  )
}

export default page1;