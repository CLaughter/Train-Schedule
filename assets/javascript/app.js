var firebaseConfig = {
  apiKey: "AIzaSyBrG3NoJyDT_1BG1OqwDbdNyP375JEASkk",
  authDomain: "clickcountdown-66c39.firebaseapp.com",
  databaseURL: "https://clickcountdown-66c39.firebaseio.com",
  projectId: "clickcountdown-66c39",
  storageBucket: "gs://clickcountdown-66c39.appspot.com",
  messagingSenderId: "845019678196",
  appId: "1:845019678196:web:b31c95c415037790d925a1",
  measurementId: "G-0TQB95TTXY"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$(document).ready(function() {
  console.log("Is this #*$%#! thing working?");
  // var makeRow = function() {
  // $('#newRow').empty(); 
  //   $(newRow.appendTo('row'));
  // }
  // makeRow();

  setInterval(function(){
    var now = moment().format('LLLL');
    $('#timeDate').text(now);
   }, 30000);

  $("#addUser").on('click', function(event) {
    event.preventDefault();
    var name = $('#nameInput').val().trim();
    var email = $('#emailInput').val().trim();
    var age = $('#ageInput').val().trim();
    var comment = $('#commentInput').val().trim();
  
    var data = {
      name: name,
      email: email,
      age: age,
      comment: comment,
    }
    database.ref('/data').push(data);
  });

  

});