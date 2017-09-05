import React, { Component } from 'react'

import 'normalize-css'   // OJO para que los estilos sean iguales en todos los navegadores

import styles from './app.css'

import Header from '../Header'
import Main from '../Main'


class App extends Component {

	constructor(){
		super();

		this.state = {
			user: {
				photoURL: 'http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg',
				email: 'ricardo@gmail.com',
				displayName: 'Ricardo Lopez'
          	}
		}
	}
	
	render () {
		return (
			<div>				
				<Header />
				<Main user={this.state.user} />
			</div>
		)
	}
}

export default App
