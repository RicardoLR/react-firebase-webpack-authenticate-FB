import React, { Component } from 'react'
import styles from './profile-bar.css'



class ProfileBar extends Component {

  constructor(){
    super()
  }

  /** El boton solo se mostrar si tiene:  onOpenText = true

  button className={styles.button} onClick={this.props.onOpenText}

    Evento disparado de hijo (ProfileBar) a Padre 
  */
  render() {
    return (
      <div className={styles.root} >
        <figure>
          <img className={styles.avatar} src={this.props.picture} />
        </figure>        
        <span className={styles.username}> Hola @{this.props.username} </span>

        <button className={styles.button} onClick={this.props.onOpenText} >
          <span className="fa fa-lg fa-edit"> </span> Tweet!
        </button>


        <button className={styles.button} onClick={this.props._onLogout} >
          <span className="fa fa-lg fa-sing-out"> </span> Cerrar Sesion
        </button>

      </div>
    )
  }
}


export default ProfileBar
