import React from 'react'
import style from '@/pages/articles/components/list/cardsection/cardlist/style.module.css'

const Cardlist:React.FC<React.PropsWithChildren> =({children}) => {
  return (
    <section className={style.card_cont}>{children}</section>

  )
}

export default Cardlist