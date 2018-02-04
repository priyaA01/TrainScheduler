// Initialize Firebase
var config = {
	apiKey: "AIzaSyCZI7TgF361zBghbU5O9TkpEzQ5EDjA0lw",
	authDomain: "trainscheduler-2526b.firebaseapp.com",
	databaseURL: "https://trainscheduler-2526b.firebaseio.com",
	projectId: "trainscheduler-2526b",
	storageBucket: "trainscheduler-2526b.appspot.com",
	messagingSenderId: "835993628207"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";


// Whenever a user clicks the submit-button
$("#submitBtn").on("click", function (event) {

	event.preventDefault();

	trainName = $("#trainName").val().trim();
	destination = $("#destination").val().trim();
	firstTrainTime = $("#firstTrainTime").val();
	frequency = $("#frequency").val().trim();

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency,

	});
});

database.ref().on("child_added", function (childsnapshot) {

	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");

	var trainNameFB = childsnapshot.val().trainName;
	var destinationFB = childsnapshot.val().destination;
	var frequencyFB = childsnapshot.val().frequency;
	var firstTrainTimeFB = childsnapshot.val().firstTrainTime;

	var firstTimeConverted = moment(firstTrainTimeFB, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % frequencyFB;
	var minutesAwayFB = frequencyFB - tRemainder;
	var nextArrivalFB = moment().add(minutesAwayFB, "minutes");

	var newRow = $("<tr>")
	newRow.append("<td>" + trainNameFB + "</td>");
	newRow.append("<td>" + destinationFB + "</td>");
	newRow.append("<td>" + frequencyFB + "</td>");
	newRow.append("<td>" + moment(nextArrivalFB).format("hh:mm") + "</td>");
	newRow.append("<td>" + minutesAwayFB + "</td>");
	newRow.append("</tr>");
	$("tbody").append(newRow);

});

