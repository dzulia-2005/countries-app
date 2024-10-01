import React from "react";
import styles from '@/component/herosection/section.module.css'


const Herosection:React.FC=()=>{
    return (
        <section className={styles.hero}>
            <img className={styles.hero_img} src="https://www.peoplehype.com/wp-content/uploads/2018/10/AdobeStock_121008469-800x445.jpeg" alt="" />
            <div className={styles.img_txt}>Discover New World!</div>
        </section>
    )
}

export default Herosection;