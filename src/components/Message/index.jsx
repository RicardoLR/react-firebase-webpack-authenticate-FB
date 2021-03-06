import React, { PropTypes, Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import moment from 'moment'

import styles from './message.css'

/** todas las this.pros son propiedades
 * Declaramos el tipo (string, number, func "funciones")
*/
const myPropTypes = {
	username: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	displayName: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	
	date: PropTypes.number.isRequired,
	numRetweets: PropTypes.number.isRequired,
	numFavorites: PropTypes.number.isRequired,

	_onReplyTweet: PropTypes.func.isRequired,
	_onFavorite: PropTypes.func.isRequired,
	_onRetweet: PropTypes.func.isRequired
}

class Message extends Component {

	constructor (props) {
		super(props)

		this.state = {
			pressFavorite: false,
			pressRetweet: false
		}

		this._onPressRetweet = this._onPressRetweet.bind(this)
		this._onPressFavorite = this._onPressFavorite.bind(this)
	}

	_onPressRetweet(){
		this.props._onRetweet()

		this.setState({
			pressRetweet: true
		})
	}


	_onPressFavorite(){
		this.props._onFavorite()

		this.setState({
			pressFavorite: true			
		})
	}


	render () {

		/** Se llama implicamente sin enviar parametro*/
		let dateFormat = moment(this.props.date).fromNow();

    	let userLink = `/user/${this.props.username}`

		return (
			<div className={styles.root}>
					
				<div className={styles.user}>
					
					<Link to={userLink}>
						<figure>
							<img className={styles.avatar} src={this.props.picture} />
						</figure>
					</Link>

					<span className={styles.displayName}>{this.props.displayName}</span>
					<span className={styles.username}>{this.props.username}</span>
					<span className={styles.date}>{dateFormat}</span>
				</div>
				<h3>{this.props.text}</h3>
				<div className={styles.buttons}>
					<div className={styles.icon} onClick={this.props._onReplyTweet} >
						<span className='fa fa-reply'></span>
					</div>

					<div className={(this.state.pressRetweet) ? styles.rtGreen : ''} 
						onClick={this._onPressRetweet} >

						<span className='fa fa-retweet'></span>
						<span className={styles.num}> {this.props.numRetweets} </span>
					</div>
					
					<div className={(this.state.pressFavorite) ? styles.favYellow : ''} 
						onClick={this._onPressFavorite} >

						<span className='fa fa-star'></span>
						<span className={styles.num}> {this.props.numFavorites} </span>
					</div>
				</div>

			</div>
		)
	}
}

Message.propTypes = myPropTypes;

export default Message
