import * as firebase from 'firebase'

import {FirebaseConfig} from '../config/keys';
firebase.initializeApp(FirebaseConfig)

const databaseRef = firebase.database().ref();
const auth = firebase.auth()
export const todosRef = databaseRef.child("todos")
export {auth}