
import React, { PropTypes } from 'react'
import styles from './login.css'

const propTypes = {
  onAuth: PropTypes.func.isRequired,
  onAuthFB : PropTypes.func.isRequired,
  
}

function Login ({ onAuth, onAuthFB }) {
  
  return (
    <div className={styles.root}>

      <p className={styles.text}>
        Necesitamos que inicies sesion con tu alguna cuenta
        para que puedas leer y escribir mensajes
      </p>

      <button className={styles.button} onClick={onAuth} >
        <span className='fa fa-github '></span> Login con Github
      </button>

      <button className={styles.button} onClick={onAuthFB} >
        <span className='fa fa-github '></span> Login con FB
      </button>

    </div>
  )

}

Login.propTypes = propTypes

export default Login
