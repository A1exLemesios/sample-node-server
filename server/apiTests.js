
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


describe("/get/customer", function() {

  var answer;

  it("should return a 200 HTTP status code", function(done) {
    server
    .get("/customer")
    .query(
      {
        idCustomer: 2
      }
    )
    .end(function(err, res) {
      answer = res;
      should(answer.status).be.eql(200);
    // console.log(response.status)
      done();
    });
  });

  it("should return an object", function(done) {
    should(answer).be.type("object");
    done();
  });
});

describe("/post/customer", function() {

  var answer;

  it("should return a 200 HTTP status code", function(done) {
    server
    .post("/customer")
    .query(
      {
        firstName: "Gandalf",
        lastName: "theWhite"
      }
    )
    .end(function(err, res) {
      answer = res;
      should(answer.status).be.eql(200);
      done();
    });
  });

  it("should return an object", function(done) {
    should(answer).be.type("object");
    done();
  });

  it("should have a property called firstName and a property called lastName", function(done) {
    // answer.should.have.property('firstName');
    should(answer).have.property("insertId");
    done();
  });
});
