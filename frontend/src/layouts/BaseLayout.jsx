import Head from "next/head";
import styles from "./BaseLayout.module.css";

function BaseLayout({ seoTitle, children }) {
  return (
    <>
      <Head>
        <title>{seoTitle} • EPus Booking</title>
      </Head>
      <main className={styles.content}>{children}</main>
    </>
  );
}

export default BaseLayout;
