import Herosection from '@/pages/home/components/herosection/herosection'
import Cardsection from '@/pages/home/components/cardssection/secsection'


const Geo  = {
    country: "Georgia",
    population: 3710000, // Add more details
    capital: "Tbilisi"
   }  

const CardSectionview = () => {
    return(
        <>
            <Herosection/>
            <Cardsection obj = {Geo}/>
        </>
    )
} 

export default CardSectionview