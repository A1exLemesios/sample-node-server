// Declare dependecies
var express     = require("express");
var app         = express();
//var mysql       = require("mysql");

/*Connect to a database
var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sampledb'
});

database.connect();
*/

app.get("/", function(request, response) {
  response.send("Welcome to the homepage page!");
});

app.get("/contactUs", function(request, response) {
  response.send("Welcome to the contact us page!");
});

app.get("/libraries", function(request, response) {
  response.send("Welcome to the libraries page!");
});

// Set our server to listen to the port '8081'
app.listen(8081, function() {
  console.log("Running! Visit http://localhost:" + 8081 + " in your browser.");
});
