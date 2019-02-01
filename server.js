const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const app = express();
const flash = require("express-flash");
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/static")));
app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "mysecretshit",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.use(flash());

require("./server/models/User");
require("./server/config/routes.js")(app);
app.listen(port, () => console.log(`listening on port ${port}`));
