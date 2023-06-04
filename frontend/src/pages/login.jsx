import { useState, useEffect } from "react";
import Button from "../components/utils/Button";
import Styles from "../styles/pages/login.module.css";
import Link from "next/link";

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentURL, setCurrentURL] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      // window.location.replace("/"); //TODO: sementara di-comment dulu.
    }
  });

  return (
    <div className={Styles.container}>
      <p>Current URL: {currentURL}</p>
      <p>API endpoint: {apiEndpoint}</p>
      <div className={Styles.card}>
        <h1 className={Styles.title}>EPUS</h1>
        {/* <div className="flex flex-row justify-start w-full"> */}
        <h2 className="flex w-full font-semibold text-xl py-2">Masuk</h2>  
        {/* </div> */}
        <form action={login} className={Styles.form} method="post">
          <div className={Styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={Styles.input}
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
