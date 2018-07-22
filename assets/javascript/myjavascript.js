// initialize firebase //
var config = {
    apiKey: "AIzaSyCJ1x72q7zPqYR6kwT3xQ4zuEArGpESjeI",
    authDomain: "myfirstdbproject-a1291.firebaseapp.com",
    databaseURL: "https://myfirstdbproject-a1291.firebaseio.com",
    projectId: "myfirstdbproject-a1291",
    storageBucket: "myfirstdbproject-a1291.appspot.com",
    messagingSenderId: "453468125395"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#form-submit").on("click", function () {
    database.ref().push({
        name: $("#train_name").val().trim(),
        dest: $("#train_dest").val().trim(),
        first: $("#train_firstTime").val().trim(),
        frequency: $("#train_frequency").val().trim()
    });
});


database.ref().on("child_added", function (snapshot) {
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().dest;
    var trainTime = snapshot.val().first;
    var trainFrequency = snapshot.val().frequency;


    var tFrequency = trainFrequency;
    var firstTime = trainTime;


    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFrequency + " Minutes"),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain + " Minutes"),

);



$("table tbody").append(newRow);



}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});







