const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require("mongoose");
const passport = require("passport");
const customerSchema = new mongoose.Schema({
    CustomerId: Number,
    CustFirstName: String,
    CustLastName: String,
    CustAddress: String,
    CustCity: String,
    CustProv: String,
    CustPostal: String,
    CustCountry: String,
    CustHomePhone: Number,
    CustBusPhone: Number,
    CustEmail: String,
    username: String,
    password: String,
  });

  customerSchema.plugin(passportLocalMongoose);
  const Customer = new mongoose.model("Customer", customerSchema);

  passport.use(Customer.createStrategy());

passport.serializeUser(function (customer, done) {
  done(null, customer.id);
});

passport.deserializeUser(function (id, done) {
  Customer.findById(id, function (err, customer) {
    done(err, customer);
  });
});

  module.exports = Customer;