import Image from "next/image";
import Link from 'next/link';

export default function Placecard({ placeId, imgUrl, title, description}) {
  const placeDetailEndpoint = "placedetail/" + placeId
  return (
    <Link href={`/reserve/${placeId}`}>
      <div className="placecard rounded-xl w-48 p-5">
        <Image
          className="rounded-xl"
          src={imgUrl} 
          width={150}
          height={150}
          />
          <p className="font-bold pt-5">
          {title}
          </p>
          <p className="pt-1">
          {description}
          </p>
        </div>
    </Link>
  );
}