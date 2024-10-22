import React from "react";
import styles from '@/component/header/header.module.css';
import {NavLink,  useLocation,  useNavigate,  useParams } from "react-router-dom";
import { translations } from "@/translation";

const Header: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();


  const handleActiveNav = (isActive: boolean) => {
    return isActive ? styles.activerightnav : styles.rightnav;
  };

const navigate = useNavigate();
const location = useLocation();

  const changelanguage = (newLang: string) => {
    const currentpath = location.pathname.split('/').slice(2).join('/');
    navigate(`/${newLang}/${currentpath}`)
  }

  
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
          <button onClick={()=>changelanguage('en')}>en</button>
          <button onClick={()=>changelanguage('ka')}>ge</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
