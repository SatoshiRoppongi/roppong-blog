import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAarwCZxtLYTgfQX5W_wFrlVCJxDihq6rY',
  authDomain: 'roppong-blog.firebaseapp.com',
  databaseURL: 'https://roppong-blog.firebaseio.com',
  projectId: 'roppong-blog',
  storageBucket: 'roppong-blog.appspot.com',
  messagingSenderId: '93549814824',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const functions = firebase.app().functions('asia-northeast1')
