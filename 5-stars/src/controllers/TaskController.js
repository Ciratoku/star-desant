import db from "../db.js";
import Task from "../models/TaskSchema.js";

// create new Task
async function CreateTask(req, res) {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).send(newTask);
}
// get Task
async function GetTask(req, res) {
  const id = req.params.id;
  Task.findById(id)
    .then((u) => {
      if (!u) return res.status(404).send({ message: "no such Task" });
      res.status(200).send(u);
    })
    .catch((err) => console.log(err));
}
// update Task
async function UpdateTask(req, res) {
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
}

// delete Task
async function DeleteTask(req, res) {
  const id = req.params.id;
  Task.deleteOne({ _id: id })
    .then((r) => {
      if (!r.deletedCount)
        return res.status(404).send({
          message: `Task with id '${id}' had been already deleted or doesn't exist`,
        });
      res
        .status(200)
        .send({ message: `Task with id '${id}' have been deleted` });
    })
    .catch((err) => console.log(err));
}
export const TaskController = { DeleteTask, UpdateTask, GetTask, CreateTask };
