import React, { Component, PropTypes } from 'react'
import uuid from 'uuid'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'



const myPropTypes = {
  user: PropTypes.object.isRequired

}

class Main extends Component {

	constructor(props){
		super(props);

		this.state = {
			user: Object.assign({}, this.props.user, {retweets: []}, {favorites: []} ),

			usernameToReply: '',
			openText: false,
			messages: [
				{
					id: uuid.v4(),
					text: "mensaje publico", 
					picture: "http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg",
					displayName: "Ricardo Lopez",
					username: "Richi",
					date: Date.now() - 180000,
					retweets: 0,
					favorites:0
				},
				{
					id: uuid.v4(),
					text: "mensaje privado", 
					picture: "http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg",
					displayName: "Alex Rocha",
					username: "Alex",
					date: Date.now() - 180000,
					retweets: 0,
					favorites:0
				},
				{
					id: uuid.v4(),
					text: "mensaje privado", 
					picture: "http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg",
					displayName: "Alex Rocha",
					username: "Alex",
					date: Date.now() - 180000,
					retweets: 0,
					favorites:0
				},
				{
					id: uuid.v4(),
					text: "mensaje privado", 
					picture: "http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg",
					displayName: "Alex Rocha",
					username: "Alex",
					date: Date.now() - 180000,
					retweets: 0,
					favorites:0
				},
				{
					id: uuid.v4(),
					text: "mensaje privado", 
					picture: "http://www.infoanimales.com/wp-content/uploads/2014/05/leon-3-550x413.jpeg",
					displayName: "Alex Rocha",
					username: "Alex",
					date: Date.now() - 180000,
					retweets: 0,
					favorites:0
				}
			]
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


	/** mis funciones de componente */
	_handleOpenText(event){
		event.preventDefault(); // evitar compoertamiento por defecto en navegador
		
		this.setState({ openText: true })
	}
	
	/** Si openText = true, regresa componente para ser mostrado  

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


	_handleSendText(event){
		event.preventDefault(); // evitar compoertamiento por defecto en navegador

		/** mi event.target es todo el componente "InputText" su form...  */
		let newMessage = {
			id: uuid.v4(),
			username: this.props.user.email.split('@')[0],
			displayName: this.props.user.displayName,
			picture: this.props.user.photoURL,
			date: Date.now(),

			text: event.target.text.value
		}

		console.log("newMessage", newMessage);

		this.setState({
			messages: this.state.messages.concat([newMessage]),
			openText: false
		})
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
		this.setState({
			openText : true,
			usernameToReply
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
