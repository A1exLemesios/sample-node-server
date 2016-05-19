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
  database.query(`SELECT * FROM orderstbl WHERE idOrder = ?`, [idOrder], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.put("/order", function(request, response) {
  orderPrice = request.query.orderPrice;
  idOrder = request.query.idOrder;
  database.query(`UPDATE orderstbl SET orderPrice = ? WHERE idOrder = ?`, [orderPrice, idOrder], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.delete("/order", function(request, response) {
  idOrder = request.query.idOrder;
  database.query(`DELETE FROM orderstbl WHERE idOrder = ? `, [idOrder], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

app.post("/order", function(request, response) {
    orderPrice = request.query.orderPrice;
  database.query('INSERT INTO orderstbl SET orderPrice =  ?', [orderPrice], function(error, rows) {
    if (error) throw error;
    var result = JSON.stringify(rows);
    response.send(result);
  });
});

// Set our server to listen to the port '8081'
app.listen(8081, function() {
  console.log("Running! Visit http://localhost:" + 8081 + " in your browser.");
});
