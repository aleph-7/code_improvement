const express = require("express");
const cors = require("cors");
const parser = require("body-parser");
require("dotenv").config();
const jsw = require("jsonwebtoken");
const secretKey =
  "a3e31fd2b7ed999b65ee2653024297b9f737e282afb9b686d8401e10c617a591";
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(parser.json());

const User = require("./models/userDB").userSchema;
const SportsBookings = require("./models/bookingsDB").sportBookingsSchema;
const Yoga_Sessions = require("./models/contentDB").yoga_sessionSchema;
const Workshop = require("./models/contentDB").sport_workshopSchema;
const Leaderboard = require("./models/leaderboardDB").leaderboardSchema;
const Blog = require("./models/contentDB").blog_counsellorSchema;
const Court = require("./models/courtDB").courtsSchema;
const Availability =
  require("./models/contentDB").counsellor_availabilitySchema;
const Gymbook = require("./models/bookingsDB").gym_bookingsSchema;

app.get("/badminton/leaderboard", async (req, res) => {
  let attributeList;
  await Leaderboard.find({}).then((results) => {
    attributeList = results.map((doc) => [doc.position]);
  });
  res.json({ message: attributeList });
});

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
const leaderboardRoutes = require("./routes/leaderboard");
app.use("/leaderboard", leaderboardRoutes);

//Listening to the server.
app.listen(process.env.PORT || 6300, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

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

app.post("/coach/postWorkshop", async (req, res) => {
  try {
    const new_workshop = new Workshop({
      time_slot_start: req.body.start_time,
      time_slot_end: req.body.end_time,
      content: req.body.description,
      // equipment: req.body.equipment,
      equipment: {
        raquet: Number(req.body.raquet),
        cork: Number(req.body.cork),
        shoe: Number(req.body.shoe),
      },
      coach_user_id: req.body.coach_user_id,
      max_strength: req.body.max_participants,
      date_slot: req.body.date,
      participant_id: [],
      type_of_sport: req.body.type_of_sport,
    });
    console.log(new_workshop);
    const doc = await new_workshop.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Post successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Post failed" });
  }
});

app.post("/coach/postWorkshop", async (req, res) => {
  try {
    const new_workshop = new Workshop({
      time_slot_start: req.body.start_time,
      time_slot_end: req.body.end_time,
      content: req.body.description,
      // equipment: req.body.equipment,
      equipment: {
        raquet: Number(req.body.raquet),
        cork: Number(req.body.cork),
        shoe: Number(req.body.shoe),
      },
      coach_user_id: req.body.coach_user_id,
      max_strength: req.body.max_participants,
      date_slot: req.body.date,
      participant_id: [],
      type_of_sport: req.body.type_of_sport,
    });
    console.log(new_workshop);
    const doc = await new_workshop.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Post successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Post failed" });
  }
});

app.post("/coach/postWorkshop", async (req, res) => {
  try {
    const new_workshop = new Workshop({
      time_slot_start: req.body.start_time,
      time_slot_end: req.body.end_time,
      content: req.body.description,
      // equipment: req.body.equipment,
      equipment: {
        raquet: Number(req.body.raquet),
        cork: Number(req.body.cork),
        shoe: Number(req.body.shoe),
      },
      coach_user_id: req.body.coach_user_id,
      max_strength: req.body.max_participants,
      date_slot: req.body.date,
      participant_id: [],
      type_of_sport: req.body.type_of_sport,
    });
    console.log(new_workshop);
    const doc = await new_workshop.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Post successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Post failed" });
  }
});

app.get("/coach/statistics", async (req, res) => {
  try {
    let attributeList;
    const sport = req.query.type_of_sport;
    // Assuming the coach_user_id is passed as a query parameter
    // Retrieve workshops associated with the specified coach_user_id
    await Workshop.find({ type_of_sport: sport }).then((results) => {
      attributeList = results.map((doc) => ({
        content: doc.content,
        participantsCount: doc.participants_id.length, // Get the length of participants_id array
      }));
    });

    console.log(attributeList);

    // Sending the retrieved workshops as a response to the frontend
    res.status(200).json({ attributeList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve workshops" });
  }
});

//ARUSHU's playground

app.post("/counsellor/postBlog", async (req, res) => {
  try {
    const new_blog = new Blog({
      content: req.body.content,
      title: req.body.content,
      counsellor_username: req.body.counsellor_username,
    });
    console.log(new_blog);
    const doc = await new_reservation.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Blog posted successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Blog posting failed" });
  }
});
app.post("/counsellor/availability", async (req, res) => {
  try {
    const new_availabilty = new Availability({
      day_vector: req.body.day_vector,
      hour_vector: req.body.hour_vector,
      date_slot: req.body.date_slot,
      date_slot_time_vector: req.body.date_slot_time_vector,
      counsellor_user_id: req.body.counsellor_user_id,
    });
    console.log(new_availabilty);
    const doc = await new_reservation.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Availability updated successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Availabilty updating failed" });
  }
});

app.post("/coach/reserveCourt", async (req, res) => {
  try {
    const new_reservation = new SportsBookings({
      time_slot: req.body.time_slot,
      date: req.body.date_slot,
      court_id: req.body.court_id,
      show_up_status: req.body.show_up_status,
      type_of_sport: req.body.type_of_sport,
      time_of_booking: req.body.time_of_booking,
      booking_status: req.body.booking_status,
      user_id: req.body.user_id,
    });
    console.log(new_reservation);
    const doc = await new_reservation.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Reservation successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Reservation failed" });
  }
});

//Apply functionality

const Blogs_Posted_By_Counsellors =
  require("./models/contentDB").blog_counsellorSchema;

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

// Define the URL of your endpoint
const endpointUrl = "http://localhost:6300/booking/sport_booking";

// Define the cron schedule (runs every day at 12:01 AM)
cron.schedule(
  "01 0 * * *",
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

//Active-Booking
app.post("/badminton/active_booking", async (req, res) => {
  console.log(req.body);

  //Searching for players mongoDB Ids
  const mongodbIds = [];
  try {
    const players = await User.find(
      { username: { $in: req.body.players } },
      "_id username"
    );
    players.forEach((player) => {
      mongodbIds.push(player._id.toString());
    });
    // Log MongoDB IDs
    console.log("MongoDB IDs:", mongodbIds);
    console.log(mongodbIds.length);

    const name = req.body.slot;
    const type_book = req.body.type;
    let book = 1;
    if (type_book == "active") book = 0;
    const hour = parseInt(name.split(":")[0], 10);
    var date = new Date();
    const current_date =
     date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const booking = new SportsBookings({
      user_id: req.body.user_id,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
      time_of_booking: new Date(),
      date_slot: current_date,
      type_of_booking: book,
      show_up_status: 0,
      court_id: null,
      partners_id: mongodbIds,
      no_partners: mongodbIds.length,
      booking_status: 0,
    });
    const doc = await booking.save();
    res.json(doc);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/checkUser/:username", async (req, res) => {
  // console.log(req.body);
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }); // Assuming username is the field in your database that stores usernames

    if (user) {
      // User exists
      res.json({ exists: true });
    } else {
      // User doesn't exist
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//////Pre-booking

app.post("/badminton/pre_booking", async (req, res) => {
  console.log(req.body);

  //Searching for players mongoDB Ids
  const mongodbIds = [];
  try {
    const players = await User.find(
      { username: { $in: req.body.players } },
      "_id username"
    );
    players.forEach((player) => {
      mongodbIds.push(player._id.toString());
    });
    // Log MongoDB IDs
    console.log("MongoDB IDs:", mongodbIds);
    console.log(mongodbIds.length);

    const name = req.body.slot;
    const type_book = req.body.type;
    let book = 1;
    const hour = parseInt(name.split(":")[0], 10);
    var date = new Date();
    const current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const booking = new SportsBookings({
      user_id: req.body.user_id,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
      time_of_booking: new Date(),
      date_slot: current_date,
      type_of_booking: book,
      show_up_status: 0,
      court_id: null,
      partners_id: mongodbIds,
      no_partners: mongodbIds.length,
      booking_status: 0,
    });
    const doc = await booking.save();
    res.json(doc);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
