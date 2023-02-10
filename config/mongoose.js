// 環境設定 configuration
const mongoose = require("mongoose"); // 載入 mongoose
const db = mongoose.connection;

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

// 取得資料庫連線狀態
db.on("error", () => {
  console.log("error!");
});
db.once("open", () => {
  console.log("connected!");
});

module.exports = db