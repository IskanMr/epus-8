import Head from "next/head";
import styles from "./BaseLayout.module.css";
import { ToastContainer } from "react-toastify";
function BaseLayout({ seoTitle, children }) {
  return (
    <>
      <Head>
        <title>{seoTitle} • EPus Booking</title>
      </Head>
      <ToastContainer />
      <main className={styles.content}>{children}</main>
    </>
  );
}

export default BaseLayout;
