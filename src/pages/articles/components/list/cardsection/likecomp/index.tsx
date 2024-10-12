import React, { PropsWithChildren } from 'react'


const Likebutton:React.FC<PropsWithChildren<{voutecount:number;onupvote: ()=> void;}>> = ({voutecount,onupvote}) => {
   
  return (
    <button style={{height:'35px' , margin: '0.5% 8px'}} onClick={onupvote} > like : {voutecount}</button>
  )
}

export default Likebutton