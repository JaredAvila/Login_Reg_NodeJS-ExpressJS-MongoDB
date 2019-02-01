const bcrypt = require("bcryptjs");
const mongoose = require("mongoose"),
  User = mongoose.model("User");

module.exports = {
  landing: (req, res) => {
    let error;
    let loggedout;
    if (req.session.error) {
      error = req.session.error;
      req.session.error = "";
      res.render("index", { error: error, loggedout: loggedout });
    } else {
      error = "";
      res.render("index", { error: error, loggedout, loggedout });
    }
  },

  logout: (req, res) => {
    let error;
    req.session.loggedout = `You have been successfully logged out ${
      req.session.name
    }. Goodbye!`;
    console.log(`User ${req.session.name} has been logged out`);
    req.session.name = "";
    req.session.email = "";
    req.session.user_id = "";
    res.render("index", { error: error, loggedout: req.session.loggedout });
  },

  dashboard: (req, res) => {
    if (!req.session.user_id) {
      res.redirect("/");
    } else {
      let user = {
        id: req.session.user_id,
        name: req.session.name,
        email: req.session.email
      };
      res.render("home", { user: user });
    }
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user === null) {
        req.session.error = "Email or password is incorect.";
        res.redirect("/");
      } else {
        bcrypt.compareSync(req.body.password, user.password);
        req.session.user_id = user._id;
        req.session.name = user.firstName;
        req.session.email = user.email;
        res.redirect("/dashboard");
      }
    });
  },

  register: (req, res) => {
    if (req.body.password !== req.body.password2) {
      req.flash("registration", ["Passwords do not match"]);
      res.redirect("/");
    } else {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let hour = date.getHours();
      let min = date.getMinutes();

      if (hour > 12) {
        hour -= 12;
        min = min + " pm";
      } else {
        min = min + " am";
      }

      if (day < 10) {
        day = "0" + day;
      }
      month += 1;
      if (month < 10) {
        month = "0" + month;
      }
      const hash = bcrypt.hashSync(req.body.password, 10);
      date = `${hour}:${min} ${month} ${day}, ${year}`;
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        date: date
      });
      user.save(err => {
        if (err) {
          for (let key in err.errors) {
            req.flash("registration", err.errors[key].message);
          }
          res.redirect("/");
        } else {
          req.session.name = user.firstName;
          req.session.email = user.email;
          req.session.user_id = user._id;
          res.redirect("/dashboard");
        }
      });
    }
  }
};
