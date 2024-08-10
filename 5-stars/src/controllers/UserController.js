import db from "../db.js";
import User from "../models/UserSchema.js";

// create new user
async function CreateUser(req, res) {
  const body = req.body;
  // check if already exists
  const user = await User.findOne({ login: body.login }).exec();
  if (user) {
    return res.status(422).send({ message: "user is already exists" });
  }
  // else: create new user
  const newUser = new User(body);
  await newUser.save();
  res.status(201).send(newUser);
}
// get user
async function GetUser(req, res) {
  const login = req.params.login;
  User.findOne({ login })
    .populate("tasks")
    .then((u) => {
      if (!u) res.status(404).send({ message: "no such user" });
      res.status(200).send(u);
    })
    .catch((err) => console.log(err));
}
// update user
async function UpdateUser(req, res) {
  const login = req.params.login;
  const body = req.body;
  User.updateOne({ login, ...body })
    .then((r) => {
      if (!r.modifiedCount)
        return res
          .status(404)
          .send({ message: `ser with login '${login}' was not updated` });
      res
        .status(200)
        .send({ message: `user with login '${login}' was updated` });
    })
    .catch((err) => console.log(err));
}

// delete user
async function DeleteUser(req, res) {
  const login = req.params.login;
  User.deleteOne({ login })
    .then((r) => {
      if (!r.deletedCount)
        return res
          .status(404)
          .send({ message: `user with login '${login}' was not deleted` });
      res
        .status(302)
        .send({ message: `user with login '${login}' was deleted` });
    })
    .catch((err) => console.log(err));
}
export const UserController = { DeleteUser, UpdateUser, GetUser, CreateUser };
