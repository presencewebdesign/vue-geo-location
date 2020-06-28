import firebase from "firebase"

const firebaseConfig = {
   apiKey: "AIzaSyDJyghT8L3_QeigBglJTmX7_KoDIZ83mF8",
   authDomain: "vue-geo-location-6b493.firebaseapp.com",
   databaseURL: "https://vue-geo-location-6b493.firebaseio.com",
   projectId: "vue-geo-location-6b493",
   storageBucket: "vue-geo-location-6b493.appspot.com",
   messagingSenderId: "1065753063543",
   appId: "1:1065753063543:web:4be5f93403707b10011672",
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
