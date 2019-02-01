const mongoose = require("mongoose");
module.exports = mongoose.connect("mongodb://localhost/login_reg", {
  useNewUrlParser: true
});
