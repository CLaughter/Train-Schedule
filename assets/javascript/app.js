var firebaseConfig = {
    apiKey: "AIzaSyBUdDf6AS6nFHuH8qUn_dSw9Go-Lg9PWYA",
    authDomain: "train-schedule-97b8b.firebaseapp.com",
    databaseURL: "https://train-schedule-97b8b.firebaseio.com",
    projectId: "train-schedule-97b8b",
    storageBucket: "",
    messagingSenderId: "975374873087",
    appId: "1:975374873087:web:7d6b3f0cf44de99ab5b7ca",
    measurementId: "G-KLQGTT2RNB"
};

// Initialize
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// $(document).ready(function() {
  console.log("Is this thing working?");

  // Set current time under main title
  setInterval(function(){
    var now = moment().format('LLLL');
    $('#timeDate').text(now);
   }, 30000);

  //  Grabs user input
  $("#addTrain").on('click', function(event) {
    event.preventDefault();
    var trainName = $('#trainName-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var firstTime = $('firstTime-input').val().trim();
    var frequency = $('#frequency-input').val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    location: destination,
    time: firstTime,
    interval: frequency
  };

  // Uploads train data to database
  database.ref('/data').push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.location);
  console.log(newTrain.time);
  console.log(newTrain.interval);

  alert("New Train added");

    // Clears text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");

});

  /* Create Firebase event for adding train to database and a row in the html 
  when a user adds an entry */

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().location;
    var firstTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().interval;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(firstTime),
      $("<td>").text(frequency)
    );
  
    // Append the new row to the table
    $("#trainInfo-table > tbody").append(newRow);
  });