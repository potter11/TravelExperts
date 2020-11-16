const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const _ = require("lodash");
const app = express();
const port = 3000;

// Export Modules
const Packages = require('./views/models/Packages');
const Customer = require('./views/models/Customer');
const Agent = require('./views/models/Agent');

// Reads EJS files and HTML CSS files
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "Out little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

//To Protect Users Passwords Using Passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/travelexperts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/home-page', (req, res)=>{
  res.render('home-page')
})

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  Customer.register(
    {
      username: req.body.username,
      CustFirstName: req.body.fName,
      CustLastName: req.body.lName,
      CustAddress: req.body.address,
    },
    req.body.password,
    (err) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/home-page");
        });
      }
    }
  );
});

app.get("/travel-home/", (req, res) => {
  Packages.find({}, function (err, packages) {
    if (err) {
      console.log(err);
    } else {
      res.render("travel-home", { package: packages });
    }
  });
});

app.get("/purchase/:_id", (req, res) => {
  const id = req.params._id;
  Packages.findOne({ PackageId: id }, (err, foundPackage) => {
    if (err) {
      console.log(err);
    } else {
      
      res.render("purchase", {
        packageImage: foundPackage.image,
        packageName: foundPackage.PkgName,
        packageDesc: foundPackage.PkgDesc,
        packagePrice: foundPackage.PkgBasePrice,
      });
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

//Authenticate Login
app.post("/login", function (req, res) {
  const customer = new Customer({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(customer, function (err) {
    if (err) {
      console.log(err);
      res.redirect("login");
    } else {
      passport.authenticate("local")(req, res, function (name) {
        res.redirect("/home-page");
      });
    }
  });
});

app.get("/contact-us", (req, res) => {
  Agent.find({}, function (err, agents) {
    if (err) {
      console.log(err);
    } else {
      res.render('contact-us', {agents: agents})
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("now listening on port " + port);
});
