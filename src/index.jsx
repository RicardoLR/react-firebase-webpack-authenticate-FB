import React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import firebase from 'firebase'

import {variablesAuth} from './config/auth'


firebase.initializeApp(variablesAuth);


render(  <App /> , document.getElementById('root'))
