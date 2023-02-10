const express = require("express");
const router = express.Router();
const passport = require("passport");

const app = express();
const bodyParser = require("body-parser");
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const User = require("../../models/user");

// 取得登入頁
router.get("/login", (req, res) => {
  res.render("login");
});

// 提交登入表單
// 加入 middleware，驗證 request 登入狀態
router.post("/login",(req,res,next)=>{
  console.log('req.user is',req.user)
  console.log('req.isAuthenticated() is',req.isAuthenticated())
  return next()
},  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

// 取得註冊頁
router.get("/register", (req, res) => {
  res.render("register");
});

// 提交註冊表單
router.post("/register", (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log("User already exists.");
        res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({
          name,
          email,
          password,
        })
          .then(() => res.redirect("/"))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

// 登出
router.get(
  ("/logout",
  (req, res) => {
    req.logout(); // Passport.js 提供的函式，會清除 session
    res.redirect("/users/login");
  })
);

module.exports = router;
