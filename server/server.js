const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
require("dotenv").config();
const jsw = require("jsonwebtoken");
const secretKey =
  "a3e31fd2b7ed999b65ee2653024297b9f737e282afb9b686d8401e10c617a591";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(parser.json());

const User = require("./models/userDB").userSchema;
const SportsBookings = require("./models/bookingsDB").sportBookingsSchema;
const Yoga_Sessions = require("./models/contentDB").yoga_sessionSchema;
const Workshop = require("./models/contentDB").sport_workshopSchema;
const Blog = require("./models/contentDB").blog_counsellorSchema;
// which court is being imported, why are there different leaderboards for games
const Court = require("./models/courtDB").courtsSchema;
const Availability =
  require("./models/contentDB").counsellor_availabilitySchema;
const Gymbook = require("./models/bookingsDB").swimGymMembershipsSchema;
const Counsellor_Appointments =
  require("./models/bookingsDB").counsellorAppointmentsSchema;
const Blogs_Posted_By_Counsellors =
  require("./models/contentDB").blog_counsellorSchema;

const BadmintonCourts = require("./models/courtDB").badmintonCourtsSchema;
const TennisCourts = require("./models/courtDB").tennisCourtsSchema;
const TabletennisCourts = require("./models/courtDB").tabletennisCourtsSchema;
const SquashCourts = require("./models/courtDB").squashCourtsSchema;

//Authentication
const authRoutes = require("./routes/auth");
app.use("", authRoutes);
//TUTORIALS
const tutorialsRoutes = require("./routes/tutorials");
app.use("/tutorials", tutorialsRoutes);
//WORKSHOPS
const workshopRoutes = require("./routes/workshop");
app.use("/workshops", workshopRoutes);
const applyWorkshopRoutes = require("./routes/apply_workshop");
app.use("/apply_workshop", applyWorkshopRoutes);
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);
//Animesh dump imported..
const bookingRoutes = require("./routes/algorithms/booking");
app.use("/booking", bookingRoutes);
//Counsellor Dashboard backend
const CounsellorRoutes = require("./routes/counsellor");
app.use("/counsellor", CounsellorRoutes);
//coach backend
const CoachRoutes = require("./routes/coach");
app.use("/coach", CoachRoutes);
const leaderboardRoutes = require("./routes/leaderboard");
app.use("/leaderboard", leaderboardRoutes);
const gymSwimmingRoutes = require("./routes/gyminstuctor");
app.use("", gymSwimmingRoutes);
//Listening to the server.
app.listen(process.env.PORT || 6300, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
const adminRoutes = require("./routes/admin");
app.use("", adminRoutes);

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const router = express.Router();
const checkAuth = require("./middleware/check_auth");

// A protected route
app.get("/profile", checkAuth, (req, res) => {
  // Access user data through req.userData
  req.username = "kushu";
  req.password = "yoyo";
  res.json({ message: "You are authenticated" });
});

// app.get("/profile", async (req, res) => {
//   // Access user data through req.userData
//   console.log("yoyo");
//   res.json({ message: "You are authenticated" });
// });

//// ARUSHU ///////

app.post("/yoga/postSession", async (req, res) => {
  try {
    //Creating a new user
    const new_yoga_session = new Yoga_Sessions({
      max_strength: req.body.batch_size,
      content: req.body.content,
      date_slot: req.body.startDate,
      participant_id: [],
      // yoga_instructor_user_id: req.body.yoga_instructor_user_id,
      time_slot_start: req.body.startTime,
      time_slot_end: req.body.endTime,
    });
    //Saving the user to the database
    console.log(req.body);
    const doc = await new_yoga_session.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Post successful" });
  } catch (err) {
    //Sending the error message to the frontend
    console.log(err);
    res.status(500).json({ error: "Post failed" });
  }
});

//Apply functionality

app.get("/self_help", async (req, res) => {
  let attributeList;
  await Blogs_Posted_By_Counsellors.find({}).then((results) => {
    attributeList = results;
    // .map((doc) => [doc.title]);
  });
  let len = attributeList.length;
  let randomIndex = Math.floor(Math.random() * len);
  res.json({ message: attributeList[randomIndex] });
});

const cron = require("node-cron");
const request = require("request");
const { date } = require("joi");
const session = require("express-session");

// Print the time every five minutes
setInterval(() => {
  const currentTime = new Date();
  const strings = currentTime.toLocaleDateString("en-GB");
  const hours = currentTime.getHours();
  console.log(`Current time: ${currentTime}`);
  console.log(`Current date: ${strings}`);
  console.log(`Current hours: ${hours}`);
}, 1 * 60 * 1000);
// Define the URL of your endpoint
const endpointUrl = "http://localhost:6300/booking/sport_booking";
// Define the cron schedule (runs every day at 12:01 AM)
cron.schedule(
  "01 00 * * *",
  () => {
    // Make an HTTP GET request to your endpoint
    request.get(endpointUrl, (error, response, body) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Request sent successfully.");
      }
    });
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// Protected route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: req.user });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jsw.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    console.log(decoded);
    next();
  });
}

app.post("/checkUser", async (req, res) => {
  try {
    const username = req.body.user_name;
    //console.log(username);
    const user = await User.findOne({ username: username, user_category: 1 }); // Assuming username is the field in your database that stores usernames
    //console.log(user);
    if (user) {
      const userId = user._id;
      const timeSlot = req.body.time_slot;
      const type = req.body.type;
      let datetobechecked = "";
      if (type === 1) {
        var date = new Date();
        datetobechecked =
          (date.getDate() < 10 ? "0" : "") +
          date.getDate() +
          "/" +
          (date.getMonth() < 9 ? "0" : "") +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
      } else {
        let currentDate = new Date();

        // Get the next date
        let nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1); // Adding 1 day

        // Format the next date as DD-MM-YYYY
        let day = nextDate.getDate();
        let month = nextDate.getMonth() + 1; // Month is zero-based, so add 1
        let year = nextDate.getFullYear();

        // Pad the day and month with leading zeros if needed
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;

        datetobechecked = day + "/" + month + "/" + year;
      }
      // Check if the user is enrolled in any activity for the specified slot and date
      const booking = await SportsBookings.findOne({
        $and: [
          { date_slot: datetobechecked },
          { time_slot: timeSlot },
          { $or: [{ booking_status: 0 }, { booking_status: 1 }] },
          { $or: [{ user_id: userId }, { partners_id: { $all: [userId] } }] },
        ],
      });
      console.log(booking);
      if (!booking) {
        res.status(200).json({ message: "User is available for booking" });
      } else {
        res
          .status(400)
          .json({ message: "User is already booked for this slot" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/checkappliedTimeslots", async (req, res) => {
  try {
    const { user_id, selectedTime } = req.body;

    // Convert selectedTime to hours
    const selectedHour = parseInt(selectedTime.split(":")[0], 10);

    // Check if there is any existing booking for the user for the selected timeslot
    const existingBooking = await SportsBookings.findOne({
      user_id: user_id, // Assuming user_id is stored as ObjectId in the database
      time_slot: selectedHour, // Assuming time_slot is stored as an integer representing the hour in the database
    });

    if (existingBooking) {
      // If there is an existing booking, send a response indicating that the user has already applied for the timeslot
      res.json({ alreadyapplied: true });
    } else {
      // If there is no existing booking, send a response indicating that the user has not applied for the timeslot
      res.json({ alreadyapplied: false });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/active_booking", async (req, res) => {
  var date = new Date();
  const current_date =
    (date.getDate() < 10 ? "0" : "") +
    date.getDate() +
    "/" +
    (date.getMonth() < 9 ? "0" : "") +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  //Searching for players mongoDB Ids
  let mongodbIds = [];
  try {
    const isavailable = await SportsBookings.findOne({
      $and: [
        { date_slot: current_date },
        { time_slot: req.body.slot },
        { $or: [{ booking_status: 0 }, { booking_status: 1 }] },
        {
          $or: [
            { user_id: req.body.user_id },
            { partners_id: { $all: [req.body.user_id] } },
          ],
        },
      ],
    });
    if (isavailable) {
      res.status(500).json({
        error: "You have applied for some other booking at this time.",
      });
    } else {
      const players = await User.find(
        { username: { $in: req.body.players } },
        "_id username"
      );
      players.forEach((player) => {
        mongodbIds.push(player._id.toString());
      });
      let length = mongodbIds.length;
      const remainingSlots = 3 - mongodbIds.length;
      if (remainingSlots > 0) {
        mongodbIds = mongodbIds.concat(
          Array(remainingSlots).fill("000000000000000000000000")
        );
      }

      const name = req.body.slot;
      const type_book = req.body.type;
      const hour = parseInt(name.split(":")[0], 10);

      const booking = new SportsBookings({
        user_id: req.body.user_id,
        time_slot: hour,
        type_of_sport: req.body.sport_type,
        time_of_booking: new Date(),
        date_slot: current_date,
        type_of_booking: 1,
        show_up_status: 0,
        court_id: req.body.court_id,
        partners_id: mongodbIds,
        no_partners: length,
        booking_status: 1,
      });
      const doc = await booking.save();
      res.json(doc);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////Pre-booking
app.post("/pre_booking", async (req, res) => {
  let currentDate = new Date();

  // Get the next date
  let nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1); // Adding 1 day

  // Format the next date as DD-MM-YYYY
  let day = nextDate.getDate();
  let month = nextDate.getMonth() + 1; // Month is zero-based, so add 1
  let year = nextDate.getFullYear();

  // Pad the day and month with leading zeros if needed
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  let nextDateFormatted = day + "/" + month + "/" + year;

  //Searching for players mongoDB Ids
  let mongodbIds = [];
  try {
    const isavailable = await SportsBookings.findOne({
      $and: [
        { date_slot: nextDateFormatted },
        { time_slot: req.body.slot },
        { $or: [{ booking_status: 0 }, { booking_status: 1 }] },
        {
          $or: [
            { user_id: req.body.user_id },
            { partners_id: { $all: [req.body.user_id] } },
          ],
        },
      ],
    });
    if (isavailable) {
      res.status(500).json({
        error: "You have applied for some other booking at this time.",
      });
    } else {
      const players = await User.find(
        { username: { $in: req.body.players } },
        "_id username"
      );
      players.forEach((player) => {
        mongodbIds.push(player._id.toString());
      });
      let length = mongodbIds.length;
      const remainingSlots = 3 - mongodbIds.length;
      if (remainingSlots > 0) {
        mongodbIds = mongodbIds.concat(
          Array(remainingSlots).fill("000000000000000000000000")
        );
      }

      const name = req.body.slot;
      const type_book = req.body.type;
      const hour = parseInt(name.split(":")[0], 10);
      // Get the current date

      const booking = new SportsBookings({
        user_id: req.body.user_id,
        time_slot: hour,
        type_of_sport: req.body.sport_type,
        time_of_booking: new Date(),
        date_slot: nextDateFormatted,
        type_of_booking: 0,
        show_up_status: 0,
        court_id: null,
        partners_id: mongodbIds,
        no_partners: length,
        booking_status: 0,
      });
      const doc = await booking.save();
      res.json(doc);
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getAvailableSlots", async (req, res) => {
  const { date, type_of_sport, capacity } = req.body;
  console.log(req.body);
  try {
    const bookings = await SportsBookings.find({
      date_slot: date,
      type_of_sport: type_of_sport,
      booking_status: 1,
    });
    const bookedSlots = bookings.reduce((acc, booking) => {
      if (!acc[booking.time_slot]) {
        acc[booking.time_slot] = 1;
      } else {
        acc[booking.time_slot]++;
      }
      return acc;
    }, {});

    // Generate all possible slots
    const allSlots = ["6", "7", "8", "16", "17", "18", "19", "20"];

    // Determine available slots
    const availableSlots = allSlots.filter((slot) => {
      return !bookedSlots.hasOwnProperty(slot) || bookedSlots[slot] < capacity;
    });
    console.log(availableSlots);
    res.json({ availableSlots });
  } catch (error) {
    console.error("Error fetching available slots for date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

///////////Gym and Pool membership pass
app.get("/gym/swim_pass", async (req, res) => {
  try {
    const { userid, year, month, type } = req.query;
    console.log(req.query);
    // Fetch membership details from the database based on the provided parameters
    const membershipDetails = await Gymbook.find({
      user_id: userid,
      year: year,
      month: month,
      type: type,
      booking_status: 1,
    });

    const formattedTimeSlots = membershipDetails.map((detail) => {
      const startTime = `${detail.time_slot}:00 `; // Assuming slots are in AM
      const endTime = `${detail.time_slot + 1}:00`; // Assuming each slot is 1 hour
      return `${startTime}-${endTime}`;
    });

    // Send the formatted time slots back to the client
    res.json(formattedTimeSlots);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching membership details." });
  }
});

///////////////////Gym and Pool Booking
app.post("/gym/swim_booking", async (req, res) => {
  console.log(req.body);
  try {
    const month = req.body.month;
    const time_slot = parseInt(req.body.time_slot.split(":")[0], 10);
    const user_id = req.body.user_id;
    const year = req.body.year;
    const time = req.body.time;
    const type = req.body.type;
    // Check if the user has already booked the same slot
    const existingBooking = await Gymbook.findOne({
      month: month,
      user_id: user_id,
      year: year,
      type: type,
      booking_status: 1,
    });

    if (existingBooking) {
      // User has already booked the slot
      console.log("booked");
      return res
        .status(400)
        .json({ error: "You have already booked this slot." });
    }

    // Check if the maximum capacity for the slot has been reached
    const countBookings = await Gymbook.countDocuments({
      month: month,
      time_slot: time_slot,
      year: year,
      booking_status: 1,
      type: type,
    });

    if (countBookings >= 40) {
      // Maximum capacity reached, save a document with booking_status -1
      const unsuccessfulBooking = new Gymbook({
        month: month,
        time_slot: time_slot,
        user_id: user_id,
        type: type,
        year: year,
        booking_status: -1, // Set booking status to -1 for unsuccessful booking
        time_of_booking: time,
      });

      await unsuccessfulBooking.save();
      return res
        .status(400)
        .json({ error: "Maximum capacity for this slot has been reached." });
    }

    // If all checks pass, proceed with booking
    const booking = new Gymbook({
      month: month,
      time_slot: time_slot,
      user_id: user_id,
      type: type,
      year: year,
      booking_status: 1, // Set booking status to 1 for successful booking
      time_of_booking: time,
    });

    const doc = await booking.save();
    res.json(doc);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

app.post("/getAvailableCourts", async (req, res) => {
  const { selectedTime, date, sport } = req.body;
  console.log(req.body);
  try {
    // Fetch bookings for the selected time slot
    const bookings = await SportsBookings.find({
      time_slot: selectedTime,
      booking_status: 1,
      date_slot: date,
      type_of_sport: sport, // Assuming 1 means booked, adjust this based on your database schema
    });

    const bookedCourtIds = bookings.map((booking) => booking.court_id);
    let CourtCollection = "";
    if (sport === "badminton") CourtCollection = BadmintonCourts;
    else if (sport === "squash") CourtCollection = SquashCourts;
    else if (sport === "tennis") CourtCollection = TennisCourts;
    else CourtCollection = TabletennisCourts;
    const availableCourts = await CourtCollection.find({
      _id: { $nin: bookedCourtIds },
    });
    console.log(availableCourts);
    // Send the available courts back to the client
    res.json({ availableCourts });
  } catch (error) {
    console.error("Error fetching available courts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////////Yoga instructor page

const yoga = require("./routes/yoga");
app.use("", yoga);
