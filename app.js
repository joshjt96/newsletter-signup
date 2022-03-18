//Require installed node packages
const express = require("express");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
 
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

// Set API key & server
client.setConfig({
    apiKey: "df4ee8bc473abb9cc3b2306e4afe4f6c", 
    server: "us14",
});
 
//POST request
app.post("/", function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
console.log(firstName, lastName, email);
const subscribingUser = {
    firstName: firstName, 
    lastName: lastName, 
    email: email
    };
    
// Add new member to list
const run = async () => {
const response = await client.lists.addListMember("84163ebbcc", {
email_address: subscribingUser.email,
status: "subscribed",
merge_fields: {
FNAME: subscribingUser.firstName,
LNAME: subscribingUser.lastName
}
});
console.log(response);
};
  
  const data = {
      members: [
          {
              email_address: email,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName,
                }
            }
        ]
    };

  const jsonData = JSON.stringify(data)
  const url = "https://us14.api.mailchimp.com/3.0/lists/84163ebbcc"
  const options = {
      
      method: "POST",
      auth: "jt:df4ee8bc473abb9cc3b2306e4afe4f6c-us14"
  };

  const request = https.request(url, options, function(response) {
      if (response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
      } else {
          res.sendFile(__dirname + "/failure.html");
      }
      response.on("data", function(data){
          console.log(JSON.parse(data));
      });
    });
    
    request.write(jsonData);
    req.end();
});


// Failure route
app.post("/failure", function(req, res){
    res.redirect("/")
});

 
//Use express app to listen on 8080 and log when it's working
app.listen(8080, function() {
  console.log("Server is running on port 8080.")
});

// Mailchimp API key
// df4ee8bc473abb9cc3b2306e4afe4f6c-us14
// Mailchimp List ID
// 84163ebbcc