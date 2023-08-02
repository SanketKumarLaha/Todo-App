const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const { _id } = req.user;
  try {
    const todo = await Todo.find({ userId: _id }).sort({ createdAt: -1 });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postTodo = async (req, res) => {
  const { taskname, description } = req.body;
  const { _id } = req.user;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }
  try {
    const todo = await Todo.create({ taskname, description, userId: _id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }
  try {
    const todo = await Todo.findOneAndDelete({ _id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }
  try {
    const todo = await Todo.findOneAndUpdate({ _id }, { ...req.body });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTodos, postTodo, deleteTodo, updateTodo };
