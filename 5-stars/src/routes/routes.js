const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController.js");
// User
router.post("/users", UserController.CreateUser);
router.get("/users/:login", UserController.GetUser);
router.delete("/users/:login", UserController.DeleteUser);
router.put("/users/:login", UserController.UpdateUser);
// Task
module.exports = router;
