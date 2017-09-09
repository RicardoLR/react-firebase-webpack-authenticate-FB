
import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'

import firebase from 'firebase'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'


const myPropTypes = {
  user: PropTypes.object.isRequired,
  
  _onLogout: PropTypes.func.isRequired
}

class Main extends Component {

	constructor(props){
		super(props);

		this.state = {
			user: Object.assign({}, this.props.user, {retweets: []}, {favorites: []} ),

			usernameToReply: '',
			openText: false,
			messages: []
		}


		/** ==========================================
			Bindear las funciones a hijos
		========================================== */
		this._handleOpenText = this._handleOpenText.bind(this)
		this._handleSendText = this._handleSendText.bind(this)
		this._handleOnCloseText = this._handleOnCloseText.bind(this)

		this._handleRetweet = this._handleRetweet.bind(this)
		this._handleFavorite = this._handleFavorite.bind(this)
		this._handleReplyTweet = this._handleReplyTweet.bind(this)

	}


	componentWillMount(){
			
		/** Manejo de eventos firebase con si DB  */
		const messageRef = firebase.database().ref().child( 'messages' )

		/** Como socket, escucha eventos como agragar nuevo mensaje con _handleSendText */
		messageRef.on('child_added', snapshot => { 
			this.setState({ 
				messages: this.state.messages.concat( snapshot.val() ),
				openText: false
			 })
		})
	}


	/** mis funciones de componente */
	_handleOpenText(event){
		event.preventDefault(); // evitar compoertamiento por defecto en navegador
		
		this.setState({ openText: true })
	}

	_handleSendText(event){
		event.preventDefault(); // evitar compoertamiento por defecto en navegador

		/** mi event.target es todo el componente "InputText" su form...  */
		let newMessage = {
			id: uuid.v4(),

			text: event.target.text.value,

			picture: this.props.user.photoURL,
			displayName: this.props.user.displayName,
			username: this.props.user.email.split('@')[0],
			date: Date.now(),
			retweets: 0,
			favorites:0
		}

		console.log("newMessage", newMessage);
		
		
		/** Manejo de Servicio con firebase, .set() : de firebase */
		const messageRef = firebase.database().ref().child('messages')
		const messageId = messageRef.push()
		messageId.set(newMessage) 

	}
	
	/** 
	 * Si openText = true, regresa componente para ser mostrado  
	@return InputText: Component */
	_renderOpenText(){
		if( this.state.openText )	
			return(
				<InputText 
					_onSendText={this._handleSendText}
					_onCloseText={this._handleOnCloseText}
				
					usernameToReply={this.state.usernameToReply}
				/>
			)
	}

	_handleOnCloseText(){
		event.preventDefault(); // evitar compoertamiento por defecto en navegador
		this.setState({ openText: false })
	}



	_handleRetweet (msgId) {

		let alreadyRetweeted = this.state.user.retweets.filter( retweet => retweet === msgId );


		if (alreadyRetweeted.length === 0) {

			let newMessages = this.state.messages.map(msg => {
				if (msg.id === msgId) {
					msg.retweets++
				}
				return msg
			});

			let newUser = Object.assign({}, this.state.user)
			newUser.retweets.push(msgId)

			this.setState({
				messages :newMessages ,
				user : newUser
			})
		}
	}
	
	_handleFavorite (msgId) {
		let alreadyFavorited = this.state.user.favorites.filter(fav => fav === msgId)

		if (alreadyFavorited.length === 0) {
			let newMessages = this.state.messages.map(msg => {
				if (msg.id === msgId) {
					msg.favorites++
				}
				return msg
			})

			let newUser = Object.assign({}, this.state.user)
			newUser.favorites.push(msgId)

			this.setState({
				messages :newMessages ,
				user : newUser
			})
		}
	}

	_handleReplyTweet( msgId, usernameToReply ){
		
		console.log("_handleReplyTweet", usernameToReply );

		this.setState({
			openText : true,
			usernameToReply : usernameToReply
		})
	}




	/**
	ProfileBar
		username={this.props.user.email.split('@')[0]}  dividir en 2 array entre en @, tomammos lo primero

	InputText solo aprece si "openText:true"
	*/
	render () {
		return (
			<div>
				<ProfileBar
					picture={this.props.user.photoURL}
					username={this.props.user.email.split('@')[0]}  // dividir en 2 array entre en @, tomammos lo primero
					onOpenText={this._handleOpenText}

					_onLogout={this.props._onLogout}
				/>

				{this._renderOpenText()}


				<MessageList 
					messages = {this.state.messages}
					
					// OMITEN parametros, por bindeo, ee esta clase esta function con (params)
					_onRetweet =  {this._handleRetweet}  
					_onFavorite = {this._handleFavorite}           
					_onReplyTweet = { this._handleReplyTweet }
				/>
			</div>
		)
	}

}

Main.propTypes = myPropTypes;

export default Main
