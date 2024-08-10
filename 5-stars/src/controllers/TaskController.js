const Task = require("../models/TaskSchema.js");
const db = require("../db.js");

// create new Task
module.exports.CreateTask = async function (req, res) {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).send(newTask);
};
// get Task
module.exports.GetTask = async function (req, res) {
  const id = req.params.id;
  Task.findById(id)
    .then((u) => {
      if (!u) res.status(404).send({ message: "no such Task" });
      res.status(200).send(u);
    })
    .catch((err) => console.log(err));
};
// update Task
module.exports.UpdateTask = async function (req, res) {
  const id = req.params.id;
  const body = req.body;
  Task.updateOne({ _id: id, ...body })
    .then((r) => {
      if (!r.modifiedCount)
        return res
          .status(404)
          .send({ message: `task with id '${id}' was not updated` });
      res.status(200).send({ message: `Task with id '${id}' was updated` });
    })
    .catch((err) => console.log(err));
};

// delete Task
module.exports.DeleteTask = async function (req, res) {
  const id = req.params.id;
  Task.deleteOne({ _id: id })
    .then((r) => {
      if (!r.deletedCount)
        return res
          .status(404)
          .send({ message: `Task with id '${id}' was not deleted` });
      res.status(302).send({ message: `Task with id '${id}' was deleted` });
    })
    .catch((err) => console.log(err));
};
