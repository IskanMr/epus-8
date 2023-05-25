import DefaultLayout from "../layouts/DefaultLayout";
import Image from "next/image";
import Link from 'next/link';
import Button from "../components/utils/Button";

export default function Index() {
  return (
    <DefaultLayout seoTitle="Home">
      <div className="bg w-full">
        <div className="flex flex-row items-center h-screen p-10 px-60 justify-evently">
          <div className="flex flex-grow flex-col">
            <div className="flex text-lg">
              Selamat datang di
            </div>
            <div className="flex text-6xl font-semibold h1epus">
              EPUS
            </div>
            <div className="flex text-lg">
              Tidak perlu kahwatir lagi untuk mendapat ruang belajar di perpustakaan kami!
            </div>
            <Link href='/place' className="pt-2">
              <Button>
                Pesan ruangan belajar
              </Button>
            </Link>
          </div>
          <div className="flex grow-0">
            <Image 
              className="rounded-xl"
              src="/lib.jpg"
              width={300}
              height={300}
            />
          </div>
          <div>

          </div>
        </div>
      </div>
    </DefaultLayout>
  );
  // return (
  //   <div>
  //     <h1 class="text-3xl font-bold underline">
  //       Hello world!
  //     </h1>
  //     <h1>
  //       Hello World!
  //     </h1>
  //   </div>
    
  // );
}
