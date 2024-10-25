import React from "react";
import styles from "@/pages/articles/components/list/herosection/section.module.css";
import { translations } from "@/translation";
import { useParams } from "react-router-dom";

const Herosection: React.FC = () => {
  const { lang } = useParams();
  console.log(lang);
  const t = translations[lang as keyof typeof translations];
  return (
    <section className={styles.hero}>
      <img
        className={styles.hero_img}
        src="https://www.peoplehype.com/wp-content/uploads/2018/10/AdobeStock_121008469-800x445.jpeg"
        alt=""
      />
      <div className={styles.img_txt}>{t.DiscoverNewWorld}</div>
    </section>
  );
};

export default Herosection;
