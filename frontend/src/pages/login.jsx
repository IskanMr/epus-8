import { useState, useEffect } from "react";

import Button from "../components/utils/Button";

import Styles from "../styles/pages/login.module.css";

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const login = () => {
    localStorage.setItem("token", "true");
    window.location.replace("/");
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      // window.location.replace("/"); //TODO: sementara di-comment dulu.
    }
  });

  return (
    <div className={Styles.container}>
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
          <Button style={{ width: "100%" }} onClick={login}>
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
}
