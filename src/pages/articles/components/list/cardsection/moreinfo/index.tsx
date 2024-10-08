import React from 'react'
import { Link } from 'react-router-dom'


interface CardinfoProps {
    id: string;
}

const Cardinfo:React.FC<CardinfoProps>=({id})=> {
  return (
    <div>
        <button>
            <Link to = {`/articles/${id}`}>
                More info
            </Link>
        </button>
    </div>
  )
}

export default Cardinfo