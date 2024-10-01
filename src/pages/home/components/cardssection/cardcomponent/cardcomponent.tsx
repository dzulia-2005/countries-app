import React from "react"
import Cardheader from "@/pages/home/components/cardssection/cardcomponent/cardheader/cardheader"
import Cardcontent from "@/pages/home/components/cardssection/cardcomponent/cardcontent/cardcontent"
import styles from '@/pages/home/components/cardssection/cardcomponent/cardcomponent.module.css'

interface Cardprops{
    obj:{
        country: string,
        population: number, // Add more details
        capital: string
    }
}

const Cardcomponent:React.FC<Cardprops> = ({obj})=>{
    return (
        <div className={styles.card}>
            <Cardheader/>
           <Cardcontent obj = {obj}/>
      </div>
    )
}

export default Cardcomponent


