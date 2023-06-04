// "use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Placecard from "../components/templates/Placecard";
import DefaultLayout from "../layouts/DefaultLayout";
import Image from "next/image";

export default function Place() {
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const myArray = ['Apple', 'Banana', 'Orange'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
      setApiEndpoint('http://' + window.location.hostname + ':8000/tempat/');
    }
    // setApiEndpoint('https://catfact.ninja/fact')
    // getPlace();
    // async function getPlace() {
    (async () => {
      try {
        const response = await axios.get(apiEndpoint);
        
        // const jsonData = await response.data;
  
        // if (Array.isArray(jsonData)) {
        //   setData(jsonData);
        // } else if (typeof jsonData === 'object') {
        //   setData(Object.values(jsonData));
        // }
        
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (typeof response.data === 'object') {
          setData(Object.values(response.data));
        }
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })()
  }, [ loading]);

  // useEffect(() => {
  //   getPlace();
  // }, []);

  // async function getPlace() {
  //   try {
  //     const response = await axios.get(apiEndpoint);
      
  //     const jsonData = await response.data;

  //     if (Array.isArray(jsonData)) {
  //       setData(jsonData);
  //     } else if (typeof jsonData === 'object') {
  //       setData(Object.values(jsonData));
  //     }
      
  //     // console.log(response.data);
  //     // if (Array.isArray(response.data)) {
  //     //   setData(response.data);
  //     // } else if (typeof response.data === 'object') {
  //     //   setData(Object.values(response.data));
  //     // }
      
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // }

  return (
    <DefaultLayout seoTitle="Place">
      <div className="bg w-full flex flex-col items-start h-full py-10 px-20 justify-evently">
        <div className="h1epus text-3xl font-semibold mb-5">
          Pesan Ruangan Belajar
        </div>
        <div className="flex flex-row flex-wrap justify-start gap-5">
          <Placecard placeDetailEndpoint="placedetail" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1" />
          {/* {myArray.map((item, index) => (
            <Placecard key={index} placeDetailEndpoint="placedetail" imgUrl="/seatsquare.png" title={item} description="Ruangan berkapasitas 16 orang di lantai 1" />
          ))} */}
          
          {loading ? (
            <p>Loading data...</p>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <Placecard
                key={index}
                placeId={item.id_place}
                imgUrl="/seatsquare.png"
                title={item.nama_tempat}
                description="Ruangan berkapasitas 16 orang di lantai 1"
              />
            ))
          ) : (
            <p>No data available</p>
          )}
          {/* <p>{data}</p> */}
          <p>Current URL: {currentURL}</p>
          <p>API endpoint: {apiEndpoint}</p>
        </div>
      </div>
    </DefaultLayout>
  );
}