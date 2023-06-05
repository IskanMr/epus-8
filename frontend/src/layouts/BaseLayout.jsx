import Head from "next/head";
import styles from "./BaseLayout.module.css";

function BaseLayout({ seoTitle, children }) {
  return (
    <>
      <Head>
        <title>{seoTitle} • EPus Booking</title>
        {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
      </Head>
      <main className={styles.content}>{children}</main>
    </>
  );
}

export default BaseLayout;
