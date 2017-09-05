import React, { PropTypes, Component } from 'react'

import styles from './message-list.css'

import Message from '../Message'


/** Componente hijo de Main */
class MessageList extends Component {

  constructor (props) {
    super(props)
  }

  render () {

    return (
      <div className={styles.root}>

        { this.props.messages.map( msg => {
          return (
            <Message
              key={msg.id}
              text={msg.text}
              picture={msg.picture}
              displayName={msg.displayName}
              username={msg.username}
              date={msg.date}
            />

          )
        }).reverse()  }

      </div>
    )
  }
}

export default MessageList
