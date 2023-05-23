import { useState, useEffect } from "react";

import DefaultLayout from "../layouts/DefaultLayout";

import Button from "../components/utils/Button";

import Styles from "../styles/pages/index.module.css";

export default function Home() {
  const [conState, setConState] = useState("No Monitoring!");
  const [conStart, setConStart] = useState(false);

  const start = () => {
    !conStart ? setConState("Monitoring") : setConState("No Monitoring!");
    setConStart(!conStart);
  };

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      window.location.replace("/login");
    }
  });

  return (
    <DefaultLayout seoTitle="Home">
      <div className={Styles.container}>
        <div className={Styles.content}>
          <img
            src={`/assets/${
              conState == "Monitoring" ? "save.svg" : "notMonitor.svg"
            }`}
            alt="Not Monitoring"
          />
          <h1 style={{ textAlign: "center" }}> {conState}</h1>
        </div>
        <Button type={conStart ? "active" : ""} onClick={start}>
          {conStart ? "Stop monitoring" : "Start monitoring"}
        </Button>
      </div>
    </DefaultLayout>
  );
}
