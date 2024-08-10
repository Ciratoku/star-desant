const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController.js");
const TaskController = require("../controllers/TaskController.js");
// Task
router.post("/tasks", TaskController.CreateTask);
router.get("/tasks/:id", TaskController.GetTask);
router.delete("/tasks/:id", TaskController.DeleteTask);
router.put("/tasks/:id", TaskController.UpdateTask);
// User
router.post("/users", UserController.CreateUser);
router.get("/users/:login", UserController.GetUser);
router.delete("/users/:login", UserController.DeleteUser);
router.put("/users/:login", UserController.UpdateUser);

module.exports = router;
