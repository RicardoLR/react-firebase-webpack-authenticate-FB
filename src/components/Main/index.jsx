import React, { Component, PropTypes } from 'react'

import MessageList from '../MessageList'

class Main extends Component {

  constructor(){
    super();

    this.state = {
      messages: [
        {
          text: "mensaje publico", 
          picture: "http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg",
          displayName: "Ricardo Lopez",
          username: "Richi",
          date: Date.now()- 180000
        }
      ]
    }
  }

  render () {
    return (
      <MessageList messages={this.state.messages} />
    )
  }
}


export default Main
