import React, { FormEvent } from 'react'

type cardcreateformprops = {
    oncardcreate:(event:FormEvent<HTMLFormElement>)=>void
}

const Cardcreateform:React.FC<cardcreateformprops> = ({oncardcreate}) => {
  return (
    <form onSubmit={oncardcreate} style={{margin: '4% 8%'}}>
        <input style={{display:'block' ,textAlign:'center'}} name='title'/>
        <input style={{display:'block',textAlign:'center'}} name='description'/>

        <button>Create card</button>
    </form>
  )
}

export default Cardcreateform