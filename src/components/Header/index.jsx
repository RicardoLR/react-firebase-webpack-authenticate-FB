import React from 'react'
import styles from './header.css'

/** Componente Representacional sin estado (stateless)  */
function Header(){
  
  /** 
   * @return JXS 
  */
  return(
    <header className={styles.root}>
      <h1 className={styles.logo}>React + CSS Modules</h1>
    </header>
  )
}

export default Header
