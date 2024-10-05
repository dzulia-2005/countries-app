import React from "react"
import styles from '@/component/header/header.module.css'
import { NavLink } from "react-router-dom"

const Header:React.FC = ()=>{

  const handleactivenav = (isActive:boolean)=>{

    return  isActive ? styles.activerightnav : styles.rightnav

    }

    return (
        <header>
          <div className={styles.header_div}>
            <div>
              <NavLink to='/' className={({isActive})=>
                handleactivenav(isActive)}>WORLD COUNTRIES! </NavLink>
            </div>

            <nav className={styles.right_header}>
              <NavLink to="/articles" className={({isActive})=>
               handleactivenav(isActive)}>Articles</NavLink>

              <NavLink to='/about' className={({isActive})=>
                  handleactivenav(isActive)}>About</NavLink>
              
              <NavLink to="/contact" className={({isActive})=>
                handleactivenav(isActive)}>CONTACT</NavLink>
            </nav>
           </div>
        </header>
    )
}

export default Header;