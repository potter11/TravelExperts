const mongoose = require("mongoose");
// Collections Schema to Implement in Front End
const packagesSchema = new mongoose.Schema({
  PackageId: Number,
  PkgName: String,
  PkgStartDate: Date,
  PkgEndDate: Date,
  PkgDesc: String,
  PkgBasePrice: String,
  PkgAgencyCommission: String,
  image: String,
});
const Packages = new mongoose.model("Packages", packagesSchema);

module.exports = Packages;
