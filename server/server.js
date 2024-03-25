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
const Availability = require("./models/contentDB").counsellor_availabilitySchema;
const time_slots_by_counsellorsSchema = require("./models/contentDB").counsellor_availabilitySchema;
const Gymbook = require("./models/bookingsDB").gym_bookingsSchema;
const Counsellor_Appointments = require("./models/bookingsDB").counsellorAppointmentsSchema;

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
const gymSwimmingRoutes = require("./routes/gyminstuctor");
app.use("",gymSwimmingRoutes);
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
      title: req.body.title,
      counsellor_username: req.body.counsellor_username,
    });
    console.log(new_blog);
    const doc = await new_blog.save();
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
    const doc = await new_availabilty.save();
    //Sending the response to the frontend
    res.status(200).json({ message: "Availability updated successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Availabilty updating failed" });
  }
});

app.post("/counsellor/deleteDayAvailability", async (req, res) => {
  try {
    const counsellor_user_id = req.body.counsellor_user_id;
    // console.log(counsellor_user_id);
    try {
      const deletedRecord = await Availability.findOneAndDelete({
        day_vector: { $elemMatch: { $ne: 0 } },
        counsellor_user_id: counsellor_user_id,
      });

      if (deletedRecord) {
        console.log("Deleted record:", deletedRecord);
      } else {
        console.log("No record found matching the deletion condition.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Availabilty deletion failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Availabilty updating failed" });
  }
});
app.post("/counsellor/deleteDateAvailability", async (req, res) => {
  try {
    const counsellor_user_id = req.body.counsellor_user_id;
    const date_slot = req.body.date_slot;
    // console.log(date_slot);
    try {
      const deletedRecord = await Availability.findOneAndDelete({
        date_slot: date_slot,
        counsellor_user_id: counsellor_user_id,
      });
      // console.log("why is this called");
      if (deletedRecord) {
        console.log("Deleted record:", deletedRecord);
      } else {
        console.log("No record found matching the date slot.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Availabilty deletion failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Availabilty updating failed" });
  }
});

app.post("/counsellor/acceptAppointments", async (req, res) => {
  console.log(req.body);
  const booking_status = req.body.isAccept;
  const appointment_id = req.body.appointment_id;
  console.log("fml");
  try {
    const appointment = await Counsellor_Appointments.findById(appointment_id);
    //  .then(console.log(appointment));

    if (!appointment) {
      console.log("Appointment not found");
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
    const updateAppointment = await Counsellor_Appointments.findByIdAndUpdate(
      appointment_id,
      {
        //  $inc: { max_strength: -1 }, // Decrease max_strength by 1
        booking_status: booking_status,
      },
      { new: true }
    );
    if (updateAppointment) {
      console.log("Appointment updated successfully:", updateAppointment);
      res
        .status(200)
        .json({ success: true, message: "Appointment updated successfully" });
    } else {
      console.log("Appointment not found");
      res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error updating Appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating Appointment" });
  }
});

app.post("/counsellor/getAppointments", async (req, res) => {
  let attributeList;
  var finalattributeList = [];
  const counsellor_user_id = req.body.counsellor_user_id;
  try {
    // console.log("boo");
    // const records = await Appointment.find({counsellor_user_id : '65f449fd23c3a6138c0daca3'});
    const records = await Counsellor_Appointments.find({
      counsellor_user_id: counsellor_user_id,
    }).then((results) => {
      attributeList = results.map((doc) => ({
        booking_id: doc._id,
        user_id: doc.user_id,
        time_slot: doc.time_slot, //time at which appointment begins
        date_slot: doc.date_slot, // date in string format
        booking_status: doc.booking_status, // -1: rejected 0: pending 1: accepted
      }));
    });
    for (let i = 0; i < attributeList.length; i++) {
      let user_id = attributeList[i].user_id;
      console.log(user_id);
      try {
        let user_name = await User.findOne({ _id: user_id });
        if (!user_name) {
          console.log("Anonymous");
          finalattributeList.push({
            username: "Anonymous",
            time_slot: attributeList[i].time_slot,
            date_slot: attributeList[i].date_slot,
            booking_status: attributeList[i].booking_status,
            booking_id: attributeList[i].booking_id,
          });
        } else {
          console.log(user_name.username);
          finalattributeList.push({
            username: user_name.username,
            time_slot: attributeList[i].time_slot,
            date_slot: attributeList[i].date_slot,
            booking_status: attributeList[i].booking_status,
            booking_id: attributeList[i].booking_id,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    // console.log(attributeList);
    res.status(200).json({ message: finalattributeList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to fetch Appointments" });
  }
});

app.post("/counsellor/getAvailability", async (req, res) => {
  let attributeList;
  const counsellor_user_id = req.body.counsellor_user_id;
  try {
    const records = await Availability.find({
      counsellor_user_id: counsellor_user_id,
    }).then((results) => {
      attributeList = results.map((doc) => ({
        date_slot: doc.date_slot,
        date_slot_time_vector: doc.date_slot_time_vector,
        day_vector: doc.day_vector,
        hour_vector: doc.hour_vector,
      }));
    });
    res.status(200).json({ message: attributeList });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Availabilty fetching" });
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
const { date } = require("joi");

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
 (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "-" +
      (date.getMonth() < 9 ? "0" : "") +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear(); 
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
      booking_status: 1,
    });
    const bookings = await SportsBookings.find({
      date_slot: current_date,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
    });
    let length = bookings.length;

    if (req.body.sport_type == "badminton" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "squash" && length >= 4) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "table_tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
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
    // var date = new Date();

    // Get the current date
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

    let nextDateFormatted = day + "-" + month + "-" + year;

    // console.log("Next Date:", nextDateFormatted);

    const booking = new SportsBookings({
      user_id: req.body.user_id,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
      time_of_booking: new Date(),
      date_slot: nextDateFormatted,
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

app.post("/squash/active_booking", async (req, res) => {
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
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "-" +
      (date.getMonth() < 9 ? "0" : "") +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear(); // Format the month as two digits

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
      booking_status: 1,
    });
    const bookings = await SportsBookings.find({
      date_slot: current_date,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
    });
    let length = bookings.length;

    if (req.body.sport_type == "badminton" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "squash" && length >= 4) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "table_tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
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

app.post("/squash/pre_booking", async (req, res) => {
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
    // Get the current date
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

    let nextDateFormatted = day + "-" + month + "-" + year;

    const booking = new SportsBookings({
      user_id: req.body.user_id,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
      time_of_booking: new Date(),
      date_slot: nextDateFormatted,
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

app.post("/tennis/active_booking", async (req, res) => {
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
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "-" +
      (date.getMonth() < 9 ? "0" : "") +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear(); // Format the month as two digits

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
      booking_status: 1,
    });
    const bookings = await SportsBookings.find({
      date_slot: current_date,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
    });
    let length = bookings.length;

    if (req.body.sport_type == "badminton" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "squash" && length >= 4) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "table_tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
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

app.post("/tennis/pre_booking", async (req, res) => {
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
    // Get the current date
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

    let nextDateFormatted = day + "-" + month + "-" + year;

    const booking = new SportsBookings({
      user_id: req.body.user_id,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
      time_of_booking: new Date(),
      date_slot: nextDateFormatted,
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

// =================================
// COUNSELLOR USER PAGES 1

app.get("/counsellor_page_user", async (req, res) => {
  let attributeList;
  await time_slots_by_counsellorsSchema.find({}).then((results) => {
    attributeList = results.map((doc) => [
      doc.day_vector,
      doc.hour_vector,
      doc.counsellor_user_id,
      doc.date_slot,
      doc.date_slot_time_vector,
      doc.counsellor_username,
      doc.available_day_or_date,
      doc.available_time_slots_12hour,
    ]);
  });
  for (let i = 0; i < attributeList.length; i++) {
    let username;
    try {
      username = (await User.findOne({ _id: attributeList[i][2] })).username;
    } catch (err) {
      console.log(err);
    }
    attributeList[i][6] = username;
  }
  for (let i = 0; i < attributeList.length; i++) {
    let available_day_or_date = "";
    let available_time_slots_12hour = "";
    if (attributeList[i][3] !== "none") {
      available_day_or_date = attributeList[i][3];
      for (let j = 0; j < 24; j++) {
        if (attributeList[i][4][j] === 1)
          available_time_slots_12hour +=
            (j < 12 ? j : j % 12).toString() + (j < 12 ? "am" : "pm") + " ";
      }
    } else {
      available_day_or_date += attributeList[i][0][0] === 1 ? "M" : "";
      available_day_or_date += attributeList[i][0][1] === 1 ? "T" : "";
      available_day_or_date += attributeList[i][0][2] === 1 ? "W" : "";
      available_day_or_date += attributeList[i][0][3] === 1 ? "Th" : "";
      available_day_or_date += attributeList[i][0][4] === 1 ? "F" : "";
      available_day_or_date += attributeList[i][0][5] === 1 ? "Sa" : "";
      available_day_or_date += attributeList[i][0][6] === 1 ? "Su" : "";
      for (let j = 0; j < 24; j++) {
        if (attributeList[i][1][j] === 1)
          available_time_slots_12hour +=
            (j < 12 ? j : j % 12).toString() + (j < 12 ? "am" : "pm") + " ";
      }
    }
    attributeList[i][7] = available_day_or_date;
    attributeList[i][8] = available_time_slots_12hour;
  }

  let messageAttributeList = [];
  for (let i = 0; i < attributeList.length; i++) {
    let messageList = [];
    messageList.push(attributeList[i][6]);
    messageList.push(attributeList[i][7]);
    messageList.push(attributeList[i][8]);
    messageAttributeList.push(messageList);
  }

  res.json({ message: messageAttributeList });
});

app.post("/table_tennis/active_booking", async (req, res) => {
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
      (date.getDate() < 10 ? "0" : "") +
      date.getDate() +
      "-" +
      (date.getMonth() < 9 ? "0" : "") +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear(); // Format the month as two digits

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
      booking_status: 1,
    });
    const bookings = await SportsBookings.find({
      date_slot: current_date,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
    });
    let length = bookings.length;

    if (req.body.sport_type == "badminton" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "squash" && length >= 4) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
    if (req.body.sport_type == "table_tennis" && length >= 6) {
      return res.status(400).json({ error: "Court is full" });
    }
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

app.post("/table_tennis/pre_booking", async (req, res) => {
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
    // Get the current date
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

    let nextDateFormatted = day + "-" + month + "-" + year;

    const booking = new SportsBookings({
      user_id: req.body.user_id,
      time_slot: hour,
      type_of_sport: req.body.sport_type,
      time_of_booking: new Date(),
      date_slot: nextDateFormatted,
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



