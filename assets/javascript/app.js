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
var trainData = firebase.database();

// $(document).ready(function() {
console.log("Is this thing working?");

// Set current time under main title
setInterval(function(){
  var now = moment().format('LLLL');
  $('#timeDate').text(now);
 }, 30000);

//  Grabs user input and store in variables
$("#add-train").on('click', function(event) {
  event.preventDefault();
  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  // Turn firstTrain into a unit variable
  var firstTrain = moment($("#firstTrain-input").val().trim(),"HH:mm").subtract(10,"years").format("X");

  // info entered in html is now added to firebase  

    // "temporary" object for schedule data
    var newTrain = {
      name: trainName,
      location: destination,
      time: firstTrain,
      interval: frequency    
    }

  // Uploads train data to database
  trainData.ref().push(newTrain)

    // require all field input
    if(trainName !== '' || destination !== '' || firstTrain !== '' || frequency !== '') {
      alert("New Train added");
    } else {
      alert("Please fill out all information boxes");
      
      return false;
    }

  // Clears text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");

  return false;
});

// Now collect data from Firebase
// Create Firebase event for adding train to database
trainData.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store input data from Firebase into variables
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().location;
  var firstTrain = childSnapshot.val().time;
  var frequency = childSnapshot.val().interval;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("HH:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(arrival),
      $("<td>").text(minutes)
    );
    // Append the new row to trainInfo-table
    $("tbody").append(newRow);

});