
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:8081");

// Defining an object called user and applying simple tests to it
var tempAnswer; // used to delete a user that has just been created
var answer;
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


  it("should return a string", function(done) {
    should(answer.text).be.type("string");
    done();
  });

  it("should have a property called insertId", function(done) {
    tempAnswer = JSON.parse(answer.text);
    should(tempAnswer).have.property("insertId");
    done();
  });
});

describe("/delete/customer", function() {

  it("should return a 200 HTTP status code", function(done) {
    server
    .delete("/customer")
    .query(
      {
        idCustomer: tempAnswer.insertId
      }
    )
    .end(function(err, res) {
      answer = res;
      should(answer.status).be.eql(200);
      done();
    });
  });
});

describe("/post/order", function() {

  it("should return a 200 HTTP status code", function(done) {
    server
    .post("/order")
    .query(
      {
        price: 30,
        idCustomer: 3
      }
    )
    .end(function(err, res) {
      answer = res;
      should(answer.status).be.eql(200);
      done();
    });
  });
  it("should return a string and have a property called insertId", function(done) {
    should(answer.text).be.type("string");
    tempAnswer = JSON.parse(answer.text);
    should(tempAnswer).have.property("insertId");
    done();
  });

});

describe("/delete/order", function() {

  it("should return a 200 HTTP status code", function(done) {
    server
    .delete("/order")
    .query(
      {
        idOrder: tempAnswer.insertId
      }
    )
    .end(function(err, res) {
      answer = res;
      should(answer.status).be.eql(200);
      done();
    });
  });
});

describe("/put/order", function() {

  it("should return a 200 HTTP status code", function(done) {
    server
    .put("/order")
    .query(
      {
        idOrder: 5,
        price: 80
      }
    )
    .end(function(err, res) {
      answer = res;
      should(answer.status).be.eql(200);
      done();
    });
  });
  it("should be a string and have a property called affectedRows with a value of (1)", function(done) {
    answer.text.should.be.type("string");
    tempAnswer = JSON.parse(answer.text);
    tempAnswer.should.have.property("affectedRows").be.eql(1);
    done();
  });
});
