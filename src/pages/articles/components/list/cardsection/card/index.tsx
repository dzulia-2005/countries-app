import React from 'react'
import style from '@/pages/articles/components/list/cardsection/card/styles.module.css'
import { Link } from 'react-router-dom'

const Card:React.FC<React.PropsWithChildren<{id:string}>> =({id , children}) => {
  return (
  
      <Link to = {`/articles/${id}`}>
        <div className={style.cards}>{children}</div>
      </Link>
  )
}

export default Card