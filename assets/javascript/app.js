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
$("#add-train").on('click', function(event) {
  event.preventDefault();
  var trainName = $('#trainName-input').val().trim();
  var destination = $('#destination-input').val().trim();
  var frequency = $('#frequency-input').val().trim();
  var firstTime = $('#firstTime-input').val().trim();

    // require all field input
    if(trainName !== '' || destination !== '' || firstTime !== '' || frequency !== '') {
      alert("New Train added");
    } else {
      alert("Please fill out all information boxes");

      return false;
    }

    // "temporary" object for schedule data
    var newTrain = {
      name: trainName,
      location: destination,
      time: firstTime,
      interval: frequency
    }

  // Uploads train data to database
  database.ref().push(newTrain)

  // Clears text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");

  return false;
});

// Create Firebase event for adding train to database
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store input into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().location;
  var firstTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().interval;

  // Train Info test
  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTime);
  // console.log(frequency);

   // Calculate Arrival Time
  //  function nextTrain() {  
  // var someTimeAgo = moment().format("LT")
  // var rightNow =moment()
  // var timePassed = rightNow.diff(someTimeAgo)
  // var nextRun = timePassed % frequency
    var firstTrain = moment(firstTime, 'HH:mm');
    console.log(firstTrain);
    var currentTime = moment();
    var difference = currentTime.diff(firstTrain, "minutes");
    console.log(difference);
    var timeRemaining = difference % frequency;
    var minAway = (frequency - timeRemaining);
    console.log(frequency);
    console.log(timeRemaining);
    var nextArrival = currentTime.add(minAway, "minutes");

    console.log(minAway);
    console.log(nextArrival);
  // }

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minAway)
  );
  // Append the new row to trainInfo-table
  $("tbody").append(newRow);
});