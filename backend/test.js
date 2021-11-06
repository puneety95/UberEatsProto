var chai =require("chai");
var chaiHttp =require ("chai-http");
const app=require("../index.js"); ///dekhna

chai.use(chaiHttp);

//assertion style
const { expect } = chai;

describe("API Testing", function () {
  beforeEach(function (done) {
    setTimeout(() => {
      done();
    }, 1500);
  });

  describe("POST /api/login", function () {
    it("Login Check.", function (done) {
      const body = { email: "u@gmail.com", password: "Puneety@92" };
      chai
        .request(app)
        .post("/api/logIn")
        .send(body)
        .end(function (err, res) {
          expect(res).to.have.status(200);

          done(err);
        });
    });
  });
})

  /*
  /////

  ////

  describe("GET /api/orderSummary/getAllOrders?restId=8", function () {
    it("API for fetching all orders of a perticular restaturant.", function (done) {
      chai
        .request(app)
        .get("/api/orderSummary/getAllOrders?restId=8")
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  ///

  describe("POST /api/DelAddress/addAddress", function () {
    it("API for posting user address.", function (done) {
      const body = { userId: 8, address: "190 Ryland Street" };
      chai
        .request(app)
        .post("/api/DelAddress/addAddress")
        .send(body)
        .end(function (err, res) {
          expect(res).to.have.status(200);

          done(err);
        });
    });
  });
  ///
  describe("POST /api/logIn", function () {
    it("Client Login API.", function (done) {
      const body = { email: "jb@gmail.com", password: "jb@gmail.com" };
      chai
        .request(app)
        .post("/api/logIn")
        .send(body)
        .end(function (err, res) {
          expect(res).to.have.status(200);

          done(err);
        });
    });
  });
//});
