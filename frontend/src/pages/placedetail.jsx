import DefaultLayout from "../layouts/DefaultLayout";
import Image from "next/image";
import Link from 'next/link';
import Button from "../components/utils/Button";
import DateTimePicker from 'react-datetime-picker'
import React, { useState } from 'react';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function PlaceDetail() {
  const [value, onChange] = useState(new Date());
  
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
            <div>
              Ruangan untuk kapasitas 16 orang di lantai
            </div>
            {/* <div className="pt-5 grow-0">
              <select name="reservationDate" id="reservationDate" className="w-40 dropdown rounded px-1">
                <option value="24/5/2023">24/5/2023</option>
                <option value="25/5/2023">25/5/2023</option>
                <option value="26/5/2023">26/5/2023</option>
                <option value="27/5/2023">27/5/2023</option>
              </select>
            </div>
            <div className="pt-5 grow-0">
              <select name="reservationHoure" id="reservationHour" className="w-40 dropdown rounded px-1">
                <option value="07:00-08:00">07:00-08:00</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="13:00-14:00">13:00-14:00</option>
                <option value="15:00-16:00">15:00-16:00</option>
              </select>
            </div> */}
            <DateTimePicker onChange={onChange} value={value} />
            <div className="flex flex-row flex-grow items-end justify-end gap-5">
              <Link href="/placedetail">
                <p className="font-semibold p-3 orangetheme">
                  Batalkan
                </p>
              </Link>
              <Link href='/placedetail' className="">
                <Button style={{}}>
                  Pesan ruangan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}