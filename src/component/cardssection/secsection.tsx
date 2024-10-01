import React from 'react';
import Cardcomponent from  '@/component/cardssection/cardcomponent/cardcomponent'
import styles from '@/component/cardssection/secsection.module.css'


interface SecondSectionprops{
    obj:{
        country: string,
        population: number, // Add more details
        capital: string
    }
}
const SecondSection:React.FC<SecondSectionprops> = ({obj}) => {
    
    return (
    <section className={styles.card_cont}>
        <Cardcomponent obj = {obj}/>
    </section>
)
}
export default SecondSection;


