import React, { PropsWithChildren } from 'react'


const Likebutton:React.FC<PropsWithChildren<{voutecount:number;onupvote: ()=> void;}>> = ({voutecount,onupvote}) => {
   
  return (
    <button onClick={onupvote} > like : {voutecount}</button>
  )
}

export default Likebutton