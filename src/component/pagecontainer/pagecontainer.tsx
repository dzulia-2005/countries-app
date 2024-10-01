import React, { PropsWithChildren } from 'react'
import styles from '@/component/pagecontainer/pagecontainer.module.css'

const Pagecontainer:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <main className={styles.root}>{children}</main>
  )
}

export default Pagecontainer