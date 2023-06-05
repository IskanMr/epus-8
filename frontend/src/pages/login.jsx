import { useState, useEffect } from "react";
import Button from "../components/utils/Button";
import Styles from "../styles/pages/login.module.css";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(true); //TODO: set jadi false keika produksi
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
      setApiEndpoint(`http://20.51.177.188:1945/` + 'pengguna/login/');
    }
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      // window.location.replace("/"); //TODO: sementara di-comment dulu.
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiEndpoint,
        {
          username: username,
          password: password
        }  
      );
      console.log(username);
      console.log(password);
      
      localStorage.setItem("id_user", response.data.id_user);
      localStorage.setItem("username", response.data.username);
      console.log(response.data);
      alert("Login berhasil!");
      setLoading(false);
      // navigate("/login")
      router.push("/place");
    } catch (err) {
      alert("Kata sandi atau username salah!");
      toast.error(err.response);
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // const login = () => {
  //   localStorage.setItem("token", "true");
  //   window.location.replace("/");
  // };

  return (
    <div className={Styles.container}>
      {/* <p>Current URL: {currentURL}</p>
      <p>API endpoint: {apiEndpoint}</p> */}
      <div className={Styles.card}>
        <h1 className={Styles.title}>EPUS</h1>
        <h2 className="flex w-full font-semibold text-xl py-2">Masuk</h2>  
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
                <input type="checkbox" checked={passwordShown} />
                <>Perlihatkan kata sandi</>
              </a>
            </div>
          </div>
          <div className="py-2">
            <p className={Styles.link}>Bila Anda belum membuat akun, silahkan <Link href="/register" className={Styles.linkTo}>daftar</Link></p>
          </div>
          <Button style={{ width: "100%" }} onClick={onSubmit}>
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
}
