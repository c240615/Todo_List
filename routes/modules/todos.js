const express = require("express");
const router = express.Router();
const Todo = require("../../models/todo");

// 進入新增資料頁面
router.get("/new", (req, res) => {
  return res.render("new");
});

// 新增資料功能
router.post("/", (req, res) => {
  const name = req.body.name; 
  return Todo.create({ name })
    .then(() => res.redirect("/")) 
    .catch((error) => console.log(error));
});

// 新增特定 id 頁面     :id 指變動的 id 動態參數
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("detail", { todo }))
    .catch((error) => console.log(error));
});

// 進入 edit 頁面
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render("edit", { todo }))
    .catch((error) => console.log(error));
});

// id 要從網址上用 req.params.id 拿下來，而 name 要用 req.body.name 從表單拿出來
// 提交 edit 資料 /todos/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  /* 把物件裡的屬性一項項拿出來存成變數 */
  const { name, isDone } = req.body; // 解構賦值
  return (
    Todo.findById(id)
      // lean() 會把 todo 整理成資料 就不能用 save()
      .then((todo) => {
        todo.name = name;
        todo.isDone = isDone === "on";
        /* 
        如果 checkbox 打勾，它會被設定為 on
        如果 checkbox 沒有打勾，它不會有任何值
      */
        //  if( isDone === 'on'){
        //   todo.isDone = true
        //  }else{
        //   todo.isDone = false
        //  }
        return todo.save();
      })
      .then(() => res.redirect(`/todos/${id}`))
      .catch((error) => console.log(error))
  );
});
// Todo.create() 和 todo.save()，前者是操作整份資料，後者是針對單一資料

// 刪除特定資料頁面
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
