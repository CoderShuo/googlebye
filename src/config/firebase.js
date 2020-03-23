import * as firebase from 'firebase'

import {FirebaseConfig} from '../config/keys';
firebase.initializeApp(FirebaseConfig)

const auth = firebase.auth()
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

export {firestore}
export {auth}