import Link from 'next/link';
import Button from "../../components/utils/Button";
import Styles from "../../styles/components/navbar.module.css";

export default function Navbar() {
  return (
    <nav className='flex flex-row content-end items-center w-full z-10 navcustom px-16'>
      <Link href='/' className='flex font-bold text-3xl flex-grow '>EPUS</Link>
      <Link href='/place' className='flex grow-0 p-3'>Beranda</Link>
      <Link href='/profile' className='flex grow-0 p-3'>Pesan</Link>
      <Link href='/login' className='flex grow-0 p-3'>
        <Button style={{}}>
          Masuk
        </Button>
      </Link>
    </nav>
  );
}
