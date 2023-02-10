const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
// 載入 method-override 覆蓋路由
const methodOverride = require("method-override");

// 默認 ./routes/index
const routes = require("./routes");
const usePassport = require("./config/passport");

const app = express();
const port = 3000;

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// express-handlebars
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

require("./config/mongoose");

// express-session
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

// method-override
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride("_method")); // _method 將帶入下面的 http 方法

usePassport(app);

// 取代 app.get('/') 首頁  將 request 導入路由器
app.use(routes);

app.listen(3000, "0.0.0.0", () => {
  console.log("start to listen port 3000");
});
