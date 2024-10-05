import React from 'react'

const CardTitle:React.FC<React.PropsWithChildren>=({children}) => {
  return (
    <div>{children}</div>
  )
}

export default CardTitle