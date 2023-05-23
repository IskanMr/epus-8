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
      window.location.replace("/");
    }
  });

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h1 className={Styles.title}>Login</h1>
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
            <label htmlFor="password">Password</label>
            <div className={Styles.passInput}>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                className={Styles.input}
              />
              <a onClick={togglePassword} className={Styles.checkPass}>
                <input type="checkbox" checked={passwordShown} />
                <>Show Password</>
              </a>
            </div>
          </div>
          <Button style={{ width: "100%" }} onClick={login}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
