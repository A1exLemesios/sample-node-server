
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8081");

// Defining an object called user and applying simple tests to it
describe("/user", function() {

  var user = {
    name: 'Jamie',
    age: 30,
    pets: ['tobi', 'loki', 'jane', 'bandit'],
    active: `true`,
    nullTest: `sss`,
    email: `jamie@jamie.com`
  };

  it("should have a property called name", function(done) {
    user.should.have.property('name');
    done();
  });

  it("should have a property called pets, is an array and has a length of 4 values", function(done) {
    user.should.have.property('pets').with.lengthOf(4);
    user.pets.should.be.instanceof(Array);
    done();
  });

  it("should have a property called active and be equal to true", function(done) {
    user.should.have.property('active').be.eql(`true`);
    done();
  });

  it("should check if the user's age is a number and if is within range", function(done) {
    age = user.age ;
    age.should.be.within(20, 50);
    age.should.be.type(`number`);
    done();
  });

  it("should check for the @ sign and .com in an email address value", function(done) {
    email = user.email;
    email.should.containEql('@');
    email.should.containEql('.com');
    done();
  });
});

/*
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
      console.log(response)
      done();
    });
  });

  it("should return a JSON String",function(done) {
    should(response).be.type("string");
    done();
  });

});
*/
// which is the job of supertest.agent ? ,
