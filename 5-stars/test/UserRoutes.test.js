const use = (await import("chai")).use;
const chaiHttp = (await import("chai-http")).default;
const chai = use(chaiHttp);
import { expect } from "chai";
import app from "../src/app.js";
import User from "../src/models/UserSchema.js";

const should = chai.should();

before((done) => {
  User.deleteMany()
    .then((r) => done())
    .catch((err) => console.log(err));
});
describe("User", () => {
  const newUser = { login: "h2", password: "123", tasks: [] };
  const somelogin = "somelogin";
  let createdUser;
  it("should be created", (done) => {
    chai.request
      .execute(app)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        createdUser = res.body;
        done();
      });
  });
  it("shouldn't be created with same login", (done) => {
    chai.request
      .execute(app)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.message).to.be.equal("user is already exists");
        done();
      });
  });
  it("shouldn't be able to get if doesn't exist", (done) => {
    chai.request
      .execute(app)
      .get(`/users/${somelogin}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal(`no such user`);
        done();
      });
  });
  it("should be equal", (done) => {
    chai.request
      .execute(app)
      .get(`/users/${newUser.login}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(createdUser);
        done();
      });
  });

  it("should be updated", (done) => {
    newUser.password = "newPass";
    chai.request
      .execute(app)
      .put(`/users/${newUser.login}`)
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          `user with login '${newUser.login}' was updated`
        );
        done();
      });
  });
  it("shouldn't be updated if not exists", (done) => {
    chai.request
      .execute(app)
      .put(`/users/${somelogin}`)
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal(
          `user with login '${somelogin}' was not updated`
        );
        done();
      });
  });
  it("should be deleted", (done) => {
    chai.request
      .execute(app)
      .delete(`/users/${newUser.login}`)
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal(
          `user with login '${newUser.login}' have been deleted`
        );
        done();
      });
  });
  it("should be not deleted if doesn't exist", (done) => {
    chai.request
      .execute(app)
      .delete(`/users/${newUser.login}`)
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal(
          `user with login '${newUser.login}' had been already deleted or doesn't exist`
        );
        done();
      });
  });
});
