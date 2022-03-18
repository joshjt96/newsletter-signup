//Require installed node packages
const express = require("express");
const https = require("https");
 
//Create new express app
const app = express();
 
//Enable express to access static files in "public" folder
app.use(express.static("public"));
 
//Enable express to parse URL-encoded body e.g info from HTML form
app.use(express.urlencoded({extended: true}));
 
//GET request
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
 
//POST request
app.post("/", function(req, res){
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;
  console.log(firstName, lastName, email);
})
 
//Use express app to listen on 8080 and log when it's working
app.listen(8080, function() {
  console.log("Server is running on port 8080.")
});