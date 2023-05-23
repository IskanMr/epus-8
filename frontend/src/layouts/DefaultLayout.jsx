import BaseLayout from "./BaseLayout";

import Navbar from "../components/templates/Navbar";

import Styles from "./BaseLayout.module.css";

export default function DefaultLayout({ seoTitle, children }) {
  return (
    <BaseLayout seoTitle={seoTitle}>
      <Navbar />
      <div className={Styles.children}>{children}</div>
    </BaseLayout>
  );
}
