const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = (app) => {
  // 初始化 Passport
  app.use(passport.initialize());
  app.use(passport.session());
  // 設定本地登入
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          // 使用者不存在
          if (!user) {
            //有沒有錯，要傳送資料，失敗後的訊息
            return done(null, false, {
              message: "That email is not registered.",
            });
          }
          // 密碼不一樣
          if (user.password !== password) {
            return done(null, false, {
              message: "Email or Password is not correct.",
            });
          }
          return done(null, user);
        })
        .catch((err) => done(err, false));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
