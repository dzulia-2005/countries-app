import React from "react";
import styles from '@/component/header/header.module.css';
import {NavLink,  useParams } from "react-router-dom";
import { translations } from "@/translation";

const Header: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();


  const handleActiveNav = (isActive: boolean) => {
    return isActive ? styles.activerightnav : styles.rightnav;
  };



  
  const t = translations[lang as keyof typeof translations];

  return (
    <header>
      <div className={styles.header_div}>
        <div>
          <NavLink to={`/${lang}`} className={({ isActive }) => handleActiveNav(isActive)}>
            {t.title}
          </NavLink>
        </div>

        <nav className={styles.right_header}>
          <NavLink to={`/${lang}/articles`} className={({ isActive }) => handleActiveNav(isActive)}>
            {t.articles}
          </NavLink>
          <NavLink to={`/${lang}/about`} className={({ isActive }) => handleActiveNav(isActive)}>
           { t.about}
          </NavLink>
          <NavLink to={`/${lang}/contact`} className={({ isActive }) => handleActiveNav(isActive)}>
            {t.contact}
          </NavLink>

          <NavLink to={`/${lang === 'en' ? 'ka' : 'en'}/articles`} className={({ isActive }) => handleActiveNav(isActive)}>
            ქარ/eng
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
