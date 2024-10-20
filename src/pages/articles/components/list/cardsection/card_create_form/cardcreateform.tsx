import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom';
import { translations } from '@/translation';

type cardcreateformprops = {
    oncardcreate:(cardfiels:{
      country:string;
      population:string;
      capital:string
    })=>void
}

const Cardcreateform:React.FC<cardcreateformprops> = ({oncardcreate}) => {

  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations];
  
  const [country, setCountry] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  


  const [countryError, setCountryError] = useState<string>('');
  const [populationError, setPopulationError] = useState<string>('');
  const [capitalError, setCapitalError] = useState<string>('');

  const validateinp = (value:string) => {
    return value.length > 8 ? "მეტია 8-ზე" : '';
  }

  

  const handlechangecountry = (e:ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCountry(value);
      setCountryError(validateinp(value))
  } 
  

  const handlechangepopulation = (e:ChangeEvent<HTMLInputElement> )=>{
    const value = e.target.value
    setPopulation(value);
    setPopulationError(validateinp(value))
  }
 

  const handlechangecapital = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    setCapital(value);
    setCapitalError(validateinp(value))
  }


  const handlesubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    oncardcreate({
      country,
      population,
      capital,
      
    })
  }
  
  return (
    <form onSubmit={handlesubmit} style={{margin: '4% 8%'}}>

            <div> {t.country} : </div>
            <input style={{ display: 'block', textAlign: 'center' }}
                name='country' 
                value={country} 
                onChange={handlechangecountry} 
             />
            <span style={{color:'red'}}>{countryError}</span>


            <div>{t.population} :</div>
            <input style={{ display: 'block', textAlign: 'center' }} 
                name='population' 
                value={population} 
                onChange={handlechangepopulation} 
            />
            <span style={{color:'red'}}>{populationError}</span>

            <div>{t.capital} :</div>
            <input style={{ display: 'block', textAlign: 'center' }} 
                name='capital' 
                value={capital} 
                onChange={handlechangecapital} 
            />  
            <span style={{color:'red'}}>{capitalError}</span>
           
        <button>{t.createcard}</button>
    </form>
  )
}

export default Cardcreateform