// 維持文件易讀性、關注點分離 separation of concerns，SOC
const express = require("express");
const router = express.Router();
// 引用 Todo model
const Todo = require("../../models/todo");

// 首頁
router.get("/", (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: "asc" })
    .then((todos) => res.render("index", { todos: todos }))
    .catch((error) => console.error(error));
});

module.exports = router;
