
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8081");

describe("/customer", function(done) {

  var response;

  it("should return a 200 HTTP status code", function(done) {
    server
    .get("/customer")
    .query(
      {
        idCustomer: "1"
      }
    )
    .end(function(err, res) {
      response = res;
      should(response.status).be.eql(200);
      done();
    });
  });

  it("should return a JSON String",function(done) {
    should(response).be.type("string");
    done();
  });

});
