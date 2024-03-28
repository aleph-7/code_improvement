const { default: mongoose } = require("mongoose");
mongoose.pluralize(null);
const { connectCourtsDBs } = require("../databases/courtDB");

const courtsSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  occupancy_status: Number,
  court_name: String,
});

const { CourtDB } = connectCourtsDBs();
module.exports = {
  badmintonCourtsSchema: CourtDB.model("badmintons", courtsSchema),
  squashCourtsSchema: CourtDB.model("squashes", courtsSchema),
  tabletennisCourtsSchema: CourtDB.model("table_tennis", courtsSchema),
  tennisCourtsSchema: CourtDB.model("tennis", courtsSchema),
};
