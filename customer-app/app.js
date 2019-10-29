const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressValidator = require("express-validator");
const mongojs = require("mongojs");
var db = mongojs("customerapp", ["users"]);
var ObjectId = mongojs.ObjectID;

const app = express();
// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static path
app.use(express.static(path.join(__dirname, "public")));

// Global Vars
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
});
// Express Validator Middleware
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

app.get("/", (req, res) => {
  // find everything
  db.users.find((err, docs) => {
    // docs is an array of all the documents in mycollection
    console.log(docs);
    res.render("index", {
      title: "Customers",
      users: docs
    });
  });
});

app.post("/users/add", (req, res) => {
  req.checkBody("first_name", "First name is required ").notEmpty();
  req.checkBody("last_name", "Last name is required ").notEmpty();
  req.checkBody("email", "Email is required ").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render("index", {
      title: "Customers",
      users: users,
      errors: errors
    });
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    };
    db.users.insert(newUser, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
});

app.delete("/users/delete/:id", (req, res) => {
  db.users.remove({ _id: ObjectId(req.params.id) }, (err, res) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
