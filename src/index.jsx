import React from 'react'
import { render } from 'react-dom'


import firebase from 'firebase'
import {variablesAuth} from './config/auth'
firebase.initializeApp(variablesAuth);


import App from './components/App'

render(  <App /> , document.getElementById('root'))
