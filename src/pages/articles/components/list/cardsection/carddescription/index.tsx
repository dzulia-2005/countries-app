import React from 'react'
import style from "@/pages/articles/components/list/cardsection/carddescription/style.module.css"

const CardDescription: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={style.describe}>{children}</div>
  )
}

export default CardDescription