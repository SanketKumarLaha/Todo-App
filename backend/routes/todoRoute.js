const express = require("express");
const {
  getTodos,
  postTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getTodos);

router.post("/", postTodo);

router.delete("/:_id", deleteTodo);

router.patch("/:_id", updateTodo);

module.exports = router;
