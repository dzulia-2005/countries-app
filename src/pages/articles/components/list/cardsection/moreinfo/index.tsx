import React from 'react'
import { Link } from 'react-router-dom'


interface CardinfoProps {
    id: string;
}

const Cardinfo:React.FC<CardinfoProps>=({id})=> {
  return (
    <Link to = {`/articles/${id}`}>
        <button onClick={(event)=>{
            event.stopPropagation()
        }}>
            
                More info
          
        </button>
      </Link>
  )
}

export default Cardinfo