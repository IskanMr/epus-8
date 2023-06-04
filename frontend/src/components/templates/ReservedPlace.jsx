import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function ReservedPlace({title ,date, hour, id_booking}) {
  // const [id, setId] = useState("");
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
      setApiEndpoint((prevApiEndpoint) => {
        return "http://" + window.location.hostname + ":8000/booking_waktu/" + id_booking + "/";
      });
    }
  })

  const onDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(apiEndpoint);
    } catch (err) {
      console.error(err.response);
      // toast.error(err.response);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row p-2 border-solid border-2 rounded-xl my-2 border-gray-400 gap-2">
      <p className="font-medium w-40">{title}</p>
      <div className="vline "></div>
      <p>{date}</p>
      <p>--</p>
      <p className="flex-grow">{hour}</p>
      {/* <Image
        src="pen.svg" 
        width={25}
        height={25}
      /> */}
      <Image
        src="bin.svg" 
        width={25}
        height={25}
        onClick={onDelete}
      />
    </div>
  );
}