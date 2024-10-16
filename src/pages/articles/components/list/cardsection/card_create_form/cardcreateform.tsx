import React, { ChangeEvent, FormEvent, useState } from 'react'

type cardcreateformprops = {
    oncardcreate:(cardfiels:{
      country:string;
      population:string;
      capital:string
    })=>void
}

const Cardcreateform:React.FC<cardcreateformprops> = ({oncardcreate}) => {


  
  const [country, setCountry] = useState<string>("");
  const [population, setPopulation] = useState<string>("");
  const [capital, setCapital] = useState<string>("");
  const [errormsg,setErrormsg]=useState<string>('');

  const validateinp = (value:string) => {
    return value.length > 8 ? "მეტია 8-ზე" : '';
  }

  

  const handlechangecountry = (e:ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCountry(value);
      setErrormsg(validateinp(value))
  } 

  const handlechangepopulation = (e:ChangeEvent<HTMLInputElement> )=>{
    const value = e.target.value
    setPopulation(value);
    setErrormsg(validateinp(value))
  }

  const handlechangecapital = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    setCapital(value);
    setErrormsg(validateinp(value))
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

            <input style={{ display: 'block', textAlign: 'center' }}
                name='country' 
                value={country} 
                onChange={handlechangecountry} 
             />

            <input style={{ display: 'block', textAlign: 'center' }} 
                name='population' 
                value={population} 
                onChange={handlechangepopulation} 
            />

            <input style={{ display: 'block', textAlign: 'center' }} 
                name='capital' 
                value={capital} 
                onChange={handlechangecapital} 
            />
            
        <button>Create card</button>
        <div style={{color:'red'}}>{errormsg}</div>
    </form>
  )
}

export default Cardcreateform