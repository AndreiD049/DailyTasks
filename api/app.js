const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const controller = require("../controller");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;

passport.use(new Strategy(controller.users.checkUserPassword));

// Configure session persistance
passport.serializeUser(controller.users.serializeUser);
passport.deserializeUser(controller.users.deserializeUser);

const usersRouter = require("./routes/users");
const orgRouter = require("./routes/organizations");

const app = express();

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(path.dirname(__dirname), "client", "build")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
  secret: "development",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(upload.array());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* START API ROUTES */
app.use("/users", usersRouter);
app.use("/organizations", orgRouter);
/* END API ROUTES */

app.post("/login",
         passport.authenticate("local"),
         function(req, res) {
           res.status(200).json(req.user);
         });


// Always send index.html for unknown routes
app.get("/*", function(req, res) {
  res.sendFile(path.join(path.dirname(__dirname), "client", "build", "index.html"));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // TODO: show 404 page;
  res.send("error");
});

module.exports = app;
