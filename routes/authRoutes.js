const passport = require("passport");

module.exports = app => {
  //wires up to GoogleStrategy automatically when you call authenticate('google', {})
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //callback after successful auth in google
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //req incoming request, res outcoming response
  app.get("/api/current_user", (req, res) => {
    console.log("REQUEST", req);
    res.send(req.user);
  });
};
