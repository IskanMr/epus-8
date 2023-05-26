import Placecard from "../components/templates/Placecard";
import DefaultLayout from "../layouts/DefaultLayout";
import Image from "next/image";

export default function Place() {
  return (
    <DefaultLayout seoTitle="Place">
      <div className="bg w-full flex flex-col items-start h-full py-10 px-20 justify-evently">
        <div className="h1epus text-3xl font-semibold mb-5">
          Pesan Ruangan Belajar
        </div>
        <div className="flex flex-row flex-wrap justify-start gap-5">
          {/* <div className="placecard rounded-xl w-48 ">
            <Image
              className="rounded-xl m-5"
              src="/seatsquare.png" 
              width={150}
              height={150}
            />
            <p className="font-bold mx-5 my-2 m-5">
              Ruangan C-7
            </p>
            <p className="mx-5 mb-5">
              Ruangan berkapasitas 16 orang di lantai 1
            </p>
          </div> */}
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          <Placecard placeDetailEndpoint="place/1" imgUrl="/seatsquare.png" title="Ruangan C-7" description="Ruangan berkapasitas 16 orang di lantai 1"/>
          
        </div>
      </div>
    </DefaultLayout>
  );
}
