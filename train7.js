 console.log("Hello");

 var config = {
     apiKey: "AIzaSyDZUn1TPG_aqO3muN_74DQHUs_-VUaq1Cg",
     authDomain: "train7-5ad52.firebaseapp.com",
     databaseURL: "https://train7-5ad52.firebaseio.com",
     projectId: "train7-5ad52",
     storageBucket: "train7-5ad52.appspot.com",
     messagingSenderId: "880285957105"
 };
 firebase.initializeApp(config);


 var database = firebase.database();

 database.ref().on("child_added", function(snapshot, prevChildKey) {
     var newChild = snapshot.val();
     console.log("Train Name: " + newChild.trainNameInput);
     console.log("Destination: " + newChild.destinationInput);
     console.log("Train Frequency (min): " + newChild.trainFrequencyInput);
     console.log("First Train time: " + newChild.firstTrainInput);

     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
     
     var firstTrainConverted = moment(newChild.firstTrainInput, "HH:mm").subtract(1, "years");
     console.log(firstTrainConverted);

     var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % newChild.trainFrequencyInput;
    console.log(tRemainder);

     var tMinutesTillTrain = newChild.trainFrequencyInput - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

     $("#traininfobox").append("<tr><td>" + newChild.trainNameInput +
         "</td><td>" + newChild.destinationInput +
         "</td><td>" + newChild.trainFrequencyInput +
         "</td><td>" + nextTrain.format("HH:mm") + 
         "</td><td>" + tMinutesTillTrain + 
         "</td></tr>");
 });

 $(document).ready(function() {

     $("#submitBtn").on("click", function(event) {
         event.preventDefault();

         var name = $("#trainName-input").val();
         console.log(name);
         var destination = $("#destination-input").val();
         console.log(destination);
         var tFrequency = $("#trainFrequency-input").val();
         console.log(tFrequency);
         var firstTrain = $("#firstTrainTime-input").val();
         console.log(firstTrain);

         database.ref().push({
             trainNameInput: name,
             destinationInput: destination,
             trainFrequencyInput: tFrequency,
             firstTrainInput: firstTrain,
             // rateInput: rate      
         });
     });
 });