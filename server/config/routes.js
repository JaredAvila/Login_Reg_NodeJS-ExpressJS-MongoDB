const users = require("../controllers/users");

module.exports = app => {
  //GET -- LANDING PAGE
  app.get("/", (req, res) => {
    users.landing(req, res);
  });

  //GET -- LOGOUT
  app.get("/logout", (req, res) => {
    users.logout(req, res);
  });

  //GET -- DASHBOARD
  app.get("/dashboard", (req, res) => {
    users.dashboard(req, res);
  });

  //POST -- LOGIN
  app.post("/login", (req, res) => {
    users.login(req, res);
  });

  //POST -- REGISTER
  app.post("/register", (req, res) => {
    users.register(req, res);
  });
};
