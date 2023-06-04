import Image from "next/image";
import Link from 'next/link';

export default function ReservedPlace({title}) {
  return (
    <div className="flex flex-row p-2 border-solid border-2 rounded-xl my-2 border-gray-400 gap-2">
      <p className="font-medium w-40">{title}</p>
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
    </div>
  );
}