import Link from 'next/link';
import Button from "../../components/utils/Button";
import Styles from "../../styles/components/navbar.module.css";
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [username, setUsername] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUsername(username);
    if(username !== "") {
      setIsLoggedOut(false);
    }
  }, [username]);

  return (
    <nav className='flex flex-row content-end items-center w-full z-10 navcustom px-16'>
      <Link href='/' className='flex font-bold text-3xl flex-grow '>EPUS</Link>
      <Link href='/place' className='flex grow-0 p-3'>Beranda</Link>
      <Link href='/profile' className='flex grow-0 p-3'>Pesan</Link>
      <Link href={isLoggedOut ? (
            "/login"
          ) : (
            "/profile"
          )
        } 
          className='flex grow-0 p-3'>
        <Button style={{}} >
        {isLoggedOut ? (
            <p>Masuk</p>
          ) : (
            username
          )
        }
        </Button>
      </Link>
    </nav>
  );
}
