import React, { Component } from 'react'

/**
HashRouter : Encapsula todas las rutas
Match : estipula las rutas con los componentes a presentar
*/

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import 'normalize-css'   // OJO para que los estilos sean iguales en todos los navegadores

import styles from './app.css'

import Header from '../Header'
import Profile from '../Profile'
import Main from '../Main'


class App extends Component {

	constructor(){
		super();

		this.state = {
			user: {
				photoURL: 'http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg',
				email: 'ricardo@gmail.com',
				displayName: 'Ricardo Lopez',
				location: 'Reyes de leon'
			}
		}
	}

	

	render () {



	let Home = () => {
		return ( <Main user={this.state.user} /> )
	}
	

	let Profile = () => {
		return ( 
			<Profile
				picture={this.state.user.photoURL}
				username={this.state.user.email.split('@')[0]}
				displayName={this.state.user.displayName}
				location={this.state.user.location}
				emailAddress={this.state.user.email}
			/>
    )
	}


	return (

	  <Router>
	    <div>
	      <Route exact path="/" component={Home}/>

        <Route path='/profile' component={() => {
          return (
            <Profile
              picture={this.state.user.photoURL}
              username={this.state.user.email.split('@')[0]}
              displayName={this.state.user.displayName}
              location={this.state.user.location}
              emailAddress={this.state.user.email}
            />
          )
        }} />

        <Route path='/user/:username' component={({ params }) => {
          return (
            <Profile
              displayName={params.username}
              username={params.username}
            />
          )
        }} />

	    </div>
	  </Router>

		)
	}
}

export default App

  