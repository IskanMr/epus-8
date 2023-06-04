import Button from "../components/utils/Button";
import DefaultLayout from "../layouts/DefaultLayout";
import Image from "next/image";
import ReservedPlace from "../components/templates/ReservedPlace";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
      setApiEndpoint('http://' + window.location.hostname + ':8000/tempat/');
    }

    (async () => {
      try {
        const response = await axios.get(apiEndpoint);

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
  }, [data, loading]);

  return (
  <DefaultLayout seoTitle="Profile">
    <div className="bg w-full flex flex-row items-start h-full py-10 px-20 justify-evently gap-10">
      <div className="placecard flex-grow rounded-xl p-5">
        <p className="font-semibold text-lg pb-2">Ruang yang dipesan</p>
        <hr className="border-2 border-gray-400"></hr>
        {/* <div className="flex flex-row p-2 border-solid border-2 rounded-xl my-2 border-gray-400 gap-2">
          <p className="font-medium ">Ruang C-7</p>
          <div className="vline "></div>
          <p className="flex-grow">24/5/2023 -- 13:00 - 14:00</p>
          <Image
            src="pen.svg" 
            width={25}
            height={25}
          />
          <Image
            src="bin.svg" 
            width={25}
            height={25}
          />
        </div> */}
        <ReservedPlace title="Ruang C-7"/>
        {loading ? (
            <p>Loading data...</p>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <ReservedPlace
                key={index}
                title={item.nama_tempat}
              />
            ))
          ) : (
            <p>No data available</p>
          )}
          <p>Current URL: {currentURL}</p>
          <p>API endpoint: {apiEndpoint}</p>
      </div>
      <div className="placecard flex flex-col grow-0 rounded-xl items-stretch w-80">
        <div className="p-5 flex flex-col items-center">
          <Image
            src="/defaultProfilePict.jpg"
            width={150}
            height={150}
          />
        </div>
        <p className="font-bold flex flex-col items-center text-lg">John Doe</p>
        <div className="p-5 flex flex-col items-stretch pt-7">
          <Button style={{background: "#FE6321"}}>
            Keluar
          </Button>
        </div>
      </div>
    </div>
  </DefaultLayout>
  );
}
