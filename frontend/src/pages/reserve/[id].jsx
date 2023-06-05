import DefaultLayout from "../../layouts/DefaultLayout";
import Image from "next/image";
import Link from 'next/link';
import Button from "../../components/utils/Button";
import DateTimePicker from 'react-datetime-picker';
import React, { useState, useEffect, useRef } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import axios from 'axios';

export async function getServerSideProps(context) {
  const { id } = context.query;
  // Fetch the data or perform other actions based on the ID
  return {
    props: {
      id: Number(id),
    },
  };
}

export default function PlaceDetail({id}) {
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState([]);
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [submitApiEndpoint, setSubmitApiEndpoint] = useState('');
  const [loading, setLoading] = useState(true);
  const [id_user, setId_user] = useState('');
  const [id_waktu, setId_waktu] = useState('');

  const selectRef = useRef(null);

  const onSubmit = () => {
    (async () => {
      try {
        const response = await axios.post(submitApiEndpoint, {
          id_user : id_user,
          id_waktu : id_waktu 
        });
      } catch(error) {
        console.error(error);
        setLoading(false);
      }
    })();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
      setApiEndpoint('http://20.51.177.188:1945/' + 'waktu_tersedia/' + id);
      setSubmitApiEndpoint('http://20.51.177.188:1945/' + 'booking_waktu');
    }
  
    const id_user = localStorage.getItem("id_user");
    setId_user(id_user);

    (async () => {
      try {
        const response = await axios.get(apiEndpoint);

        // Extract the hour part from the 'waktu' property
				const extractHour = (datetime) => {
					const hour = datetime.split('T')[1];
					return hour;
				};

				// Handle data processing and state update
				const processData = () => {
					const fixedDate = new Date(value); 
          console.log(response.data);
          console.log(typeof response.data);
          console.log(response.data.length);

					// const extractedTime = response.data
          const extractedTime = Object.values(response.data)
						.filter(item => {
							const date = new Date(item.waktu);
							return date.toDateString() === fixedDate.toDateString() && item.is_available;
						})
						.map(item => {
              return {
                hour: extractHour(item.waktu),
                id_waktu: item.id
              };
            });
            // console.log(time);
					setTime(extractedTime);
				};

  			processData();
				console.log(time);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })()
  }, [loading, value]);

  const selectElement = selectRef.current;

  const handleChange = () => {
    const selectedId_waktu = selectElement && selectElement.options[selectElement.selectedIndex].dataset.id_waktu;
    setId_waktu(selectedId_waktu);

    console.log(id_waktu);
  };
  // Use a useEffect hook to add a change event listener on the select element
  useEffect(() => {
    

    if (selectElement) {
      selectElement.addEventListener("change", handleChange);
    }

    return () => {
      if (selectElement) {
        selectElement.removeEventListener("change", handleChange);
      }
    }; 
  }, [ selectElement, handleChange]); // Add an empty dependency array to run only once

  return (
    <DefaultLayout>
      <div className="bg w-full flex flex-row items-center h-screen p-10 px-60 justify-evently">
        <div className="placecard flex flex-row p-5 rounded-xl gap-10">
          <div className="flex grow-0">
            <Image 
              className="rounded-xl"
              src="/seatsquare.png"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-grow flex-col">
            <div className="flex text-lg font-bold grow-0">
              Ruang C-7
            </div>
            <div className="pt-3">
              Ruangan untuk kapasitas 16 orang di lantai
            </div>
            <DatePicker onChange={onChange} value={value} className="flex py-1 pb-2"/>
            {loading ? (
              <p>Loading data...</p>
            ) : time.length > 0 ? (
							<select name="reservationHour" id="reservationHour" className="w-40 dropdown rounded px-1" ref={selectRef}>
								{time.map((item, index) => (
									<option key={index} value={item.hour} data-id_waktu={item.id_waktu}>{item.hour}</option>
								))}
							</select>
            ) : (
              <p>No data available</p>
            )}
            <div className="flex flex-row flex-grow items-end justify-end gap-5">
              <Link href="/">
                <p className="font-semibold p-3 orangetheme">
                  Batalkan
                </p>
              </Link>
                <Button style={{}} onClick={onSubmit}>
                  Pesan ruangan
                </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

