import React, { useState, useEffect } from "react";
import Button from "../components/utils/Button";
import Styles from "../styles/pages/login.module.css";
import Link from "next/link";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';

export default function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate(); // get the navigate function
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiEndpoint,
        {
          username: username,
          password: password
        }  
      );
      
      // const jsonData = await response.data;
      // if (Array.isArray(jsonData)) {
      //   setData(jsonData);
      // } else if (typeof jsonData === 'object') {
      //   setData(Object.values(jsonData));
      // }
      
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (typeof response.data === 'object') {
        setData(Object.values(response.data));
      }
      // toast(response.data.message);
      setLoading(false);
      // navigate("/login")
      router.push("/login");
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const login = () => {
    localStorage.setItem("token", "true");
    window.location.replace("/");
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
      setApiEndpoint('http://' + window.location.hostname + ':8000/pengguna/');
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      // window.location.replace("/");
    }
  }, [loading]);

  return (
    <div className={Styles.container}>
      <ToastContainer />
      <div className={Styles.card}>
        <p>Current URL: {currentURL}</p>
        <p>API endpoint: {apiEndpoint}</p>
        <h1 className={Styles.title}>EPUS</h1>
        <h2 className="flex w-full font-semibold text-xl py-2">Daftar</h2>
        <form className={Styles.form} method="post">
          <div className={Styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              id="username"
              className={Styles.input}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className={Styles.inputGroup}>
            <label htmlFor="password">Kata sandi</label>
            <div className={Styles.passInput}>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                className={Styles.input}
                onChange={(event) => setPassword(event.target.value)}
              />
              <a onClick={togglePassword} className={Styles.checkPass}>
                <input type="checkbox" checked={passwordShown}/>
                <p>Perlihatkan kata sandi</p>
              </a>
            </div>
          </div>
          <div className="py-2">
            <p className={Styles.link}>Bila Anda sudah membuat akun, silahkan <Link href="/login" className={Styles.linkTo}>masuk</Link></p>
          </div>
          <Button style={{ width: "100%" }} onClick={onSubmit}>
            Daftar
          </Button>
        </form>
      </div>
    </div>
  );
}
