import React from "react"
import styles from '@/pages/home/components/cardssection/cardcomponent/cardcontent/cardcontent.module.css'

interface Cardcontentprops{
    obj:{
        country: string,
        population: number, 
        capital: string
    }
}


const Cardcontent:React.FC<Cardcontentprops> = ({obj}) => {
    return(
        <div className={styles.flag_txts}>
            <h1>Country : {obj.country}</h1>
            <div>population : {obj.population}</div>
            <div>Capital : {obj.capital}</div>
        </div>
    )
}
export default Cardcontent