import React, { PropTypes, Component } from 'react'
import styles from './input-text.css'



const myPropTypes = {
  userNameToReply: PropTypes.string.isRequired,

  _onSendText: PropTypes.func.isRequired,
  _onCloseText: PropTypes.func.isRequired
}


/** Modificara padre en metodo _onSendText */
class InputText extends Component {


  render(){
    
    return(
      <form className={styles.form} onSubmit={this.props._onSendText} > 

        <textarea className={styles.text} name='text'>
          {(this.props.usernameToReply) ? `@${this.props.usernameToReply} `  : ''}
        </textarea>

        <div className={styles.buttons} >
          <button className={styles.close} onClick={this.props._onCloseText} >
            Cerrar
          </button>
          <button className={styles.send} type='submit' >
            Enviar
          </button>
        </div>
      </form>
    )
  }

}

InputText.propTypes = myPropTypes;

export default InputText
