import Image from "next/image";
import Link from 'next/link';

export default function Placecard({ placeDetailEndpoint, imgUrl, title, description}) {
    return (
        <Link href={placeDetailEndpoint}>
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