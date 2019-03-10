// Camilo to retrieve the user sign in information
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbP-jTtItFgvCAAW62n6ieMTpnYlBVtOk",
    authDomain: "becipe-9368d.firebaseapp.com",
    databaseURL: "https://becipe-9368d.firebaseio.com",
    projectId: "becipe-9368d",
    storageBucket: "",
    messagingSenderId: "543729845832"
};

firebase.initializeApp(config);
// ---------------------------------------------------------------------- //


firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });