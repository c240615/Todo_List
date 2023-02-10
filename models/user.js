const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("User", userSchema);
// Date.now() v.s. Date.now
// 沒加括號時，代表傳入的是函式本身，而加了括號的話，代表你直接呼叫了這個函式，並傳入函式的回傳值
// 在 JavaScript 中，我們能「將函式當成物件屬性」，所以我們可以把 Date.now 這個函式當作 createdAt 的屬性，當「伺服器將註冊資料送給資料庫時」，執行 Date.now 並產生當下的時間戳記。
// 若使用 Date.now() 當作createdAt 的屬性，則會在「伺服器建立並運作起來時」就被執行，並且當專案啟動的時間戳記儲存在 createdAt 中

module.exports = mongoose.model("User", userSchema);
