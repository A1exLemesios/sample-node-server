// Declare dependecies
var express     = require("express");
var app         = express();
var mysql       = require("mysql");


var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample-node-server'
});

database.connect();


app.get("/order", function(request, response) {
  idOrder = request.query.idOrder;
  database.query(`SELECT * FROM order WHERE idOrder = ?`, [idOrder], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.put("/order", function(request, response) {
  price = request.query.price;
  idOrder = request.query.idOrder;
  database.query(`UPDATE order SET price = ? WHERE idOrder = ?`, [price, idOrder], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.delete("/order", function(request, response) {
  idOrder = request.query.idOrder;
  database.query(`DELETE FROM order WHERE idOrder = ? `, [idOrder], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.post("/order", function(request, response) {
  var values = {
    price : request.query.price,
    idCustomer : request.query.idCustomer
  }
  database.query("INSERT INTO customerOrder SET ?", [values], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.post("/customer", function(request, response) {
  values = {
    firstName : request.query.firstName,
    lastName : request.query.lastName
  };
  database.query('INSERT INTO customer SET ?', [values], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.delete("/customer", function(request, response) {
  idCustomer = request.query.idCustomer;
  database.query(`DELETE FROM customer WHERE idCustomer = ? `, [idCustomer], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

// Set our server to listen to the port '8081'
app.listen(8081, function() {
  console.log("Running! Visit http://localhost:" + 8081 + " in your browser.");
});
