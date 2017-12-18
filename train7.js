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
        // console.log("Rate: " + newChild.rateInput);
        
        // var employeeStart = moment(newChild.dateInput).format("MM/DD/YYYY");
        // console.log("******months diff: ",moment().diff(employeeStart, "months"));

        // var monthsWorked = moment().diff(employeeStart, "months");
        // var total = monthsWorked * newChild.rateInput;
        // console.log("Previous Post: " + prevChildKey);
        
        $("#traininfobox").append("<tr><td>" + newChild.trainNameInput +
         "</td><td>" + newChild.destinationInput + 
         "</td><td>" + newChild.trainFrequencyInput + 
         // "</td><td>" + newChild.rateInput + 
         // "</td><td>" + monthsWorked + 
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
          // // var date = moment($("#date-input").val().trim(), "DD/MM/YY").format("X");
          //   console.log(date);
          //   var rate = $("#rate-input").val();
          //   console.log(rate);

            database.ref().push({
                trainNameInput: name,
                destinationInput: destination,
                trainFrequencyInput: tFrequency,
                // rateInput: rate            

            });
        });

    });
   