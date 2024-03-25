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
const time_slots_by_counsellorsSchema =
  require("./models/contentDB").counsellor_availabilitySchema;
const Gymbook = require("./models/bookingsDB").swimGymMembershipsSchema;
const Counsellor_Appointments =
  require("./models/bookingsDB").counsellorAppointmentsSchema;

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

// =====================================
// COUNSELLOR USER PAGES 2

app.get("/institute_counsellors", async (req, res) => {
  let attributeList;
  await User.find({ user_category: 2 }).then((results) => {
    attributeList = results.map((doc) => [doc.username, doc._id]);
  });
  res.json({ message: attributeList });
});

app.post("/get_available_days", async (req, res) => {
  counsellor_username = req.body.counsellor_username;
  console.log(counsellor_username);
  counsellor_user_id = (await User.findOne({ username: counsellor_username }))
    ._id;
  let attributeList;
  await time_slots_by_counsellorsSchema
    .find({ counsellor_user_id: counsellor_user_id })
    .then((results) => {
      attributeList = results.map((doc) => [doc.day_vector, doc.date_slot]);
    })
    .then(() => console.log(attributeList));
  let messageAttributeList = [];
  for (let i = 0; i < attributeList.length; i++) {
    if (attributeList[i][1] !== "none")
      messageAttributeList.push(attributeList[i][1]);
    else {
      if (attributeList[i][0][0] === 1) messageAttributeList.push("Monday");
      if (attributeList[i][0][1] === 1) messageAttributeList.push("Tuesday");
      if (attributeList[i][0][2] === 1) messageAttributeList.push("Wednesday");
      if (attributeList[i][0][3] === 1) messageAttributeList.push("Thursday");
      if (attributeList[i][0][4] === 1) messageAttributeList.push("Friday");
      if (attributeList[i][0][5] === 1) messageAttributeList.push("Saturday");
      if (attributeList[i][0][6] === 1) messageAttributeList.push("Sunday");
    }
  }
  res.json({ message: messageAttributeList });
});

app.post("/get_available_time_slots", async (req, res) => {
  counsellor_username = req.body.counsellor_username;
  let date = req.body.date;
  parameter = 0;
  if (date === "Monday") {
    date = 0;
    parameter = 1;
  } else if (date === "Tuesday") {
    date = 1;
    parameter = 1;
  } else if (date === "Wednesday") {
    date = 2;
    parameter = 1;
  } else if (date === "Thursday") {
    date = 3;
    parameter = 1;
  } else if (date === "Friday") {
    date = 4;
    parameter = 1;
  } else if (date === "Saturday") {
    date = 5;
    parameter = 1;
  } else if (date === "Sunday") {
    date = 6;
    parameter = 1;
  }
  counsellor_user_id = (await User.findOne({ username: counsellor_username }))
    ._id;
  let attributeList;
  if (parameter) {
    const query = { counsellor_user_id: counsellor_user_id };
    query[`day_vector.${date}`] = 1;
    await time_slots_by_counsellorsSchema.find(query).then((results) => {
      attributeList = results.map((doc) => [doc.hour_vector]);
    });
  } else {
    await time_slots_by_counsellorsSchema
      .find({ counsellor_user_id: counsellor_user_id, date_slot: date })
      .then((results) => {
        attributeList = results.map((doc) => [doc.date_slot_time_vector]);
      });
  }
  let messageAttributeList = [];
  for (let i = 0; i < 23; i++) {
    if (attributeList[0][0][i] === 1) messageAttributeList.push(i);
  }
  res.json({ message: messageAttributeList });
});

function getDate(date) {
  let current_date_get_date = new Date();
  let day_of_week = current_date_get_date.getDay();
  let days_until;
  if (date === "Monday") days_until = (8 - day_of_week) % 7;
  else if (date === "Tuesday") days_until = (9 - day_of_week) % 7;
  else if (date === "Wednesday") days_until = (10 - day_of_week) % 7;
  else if (date === "Thursday") days_until = (11 - day_of_week) % 7;
  else if (date === "Friday") days_until = (12 - day_of_week) % 7;
  else if (date === "Saturday") days_until = (13 - day_of_week) % 7;
  else if (date === "Sunday") days_until = (14 - day_of_week) % 7;
  let new_date = new Date(current_date_get_date);
  new_date.setDate(new_date.getDate() + days_until);
  let year = new_date.getFullYear();
  let month = (new_date.getMonth() + 1).toString().padStart(2, "0");
  let dayOfMonth = new_date.getDate().toString().padStart(2, "0");
  return dayOfMonth + "-" + month + "-" + year;
}

app.post("/book_counsellor_appointment", async (req, res) => {
  const user_id = req.body.user_id;
  const counsellor_username = req.body.counsellor_username;
  console.log(counsellor_username);
  let date = req.body.date;
  if (date === "Monday") {
    date = getDate(date);
  } else if (date === "Tuesday") {
    date = getDate(date);
  } else if (date === "Wednesday") {
    date = getDate(date);
  } else if (date === "Thursday") {
    date = getDate(date);
  } else if (date === "Friday") {
    date = getDate(date);
  } else if (date === "Saturday") {
    date = getDate(date);
  } else if (date === "Sunday") {
    date = getDate(date);
  }
  const time = req.body.time;
  const program = req.body.program;
  const department = req.body.department;
  const hall = req.body.hall;
  const contact_number = req.body.contact_number;
  const counsellor_user_id = (
    await User.findOne({ username: counsellor_username })
  )._id;
  const time_of_booking = new Date();
  const booking_status = 0;
  const doc = new Counsellor_Appointments({
    user_id: user_id,
    time_slot: time,
    date_slot: date,
    counsellor_user_id: counsellor_user_id,
    booking_status: booking_status,
    time_of_booking: time_of_booking,
    program: program,
    department: department,
    hall: hall,
    contact_number: contact_number,
  });
  doc.save();
  res.json({ message: "Appointment booked successfully" });
});

// =====================================
// COUNSELLOR USER PAGES 3
app.get("/counsellor_page_user_3", async (req, res) => {
  let patient_id = req.body.user_id;
  let attributeList;
  await Counsellor_Appointments.find({ user_id: patient_id }).then(
    (results) => {
      attributeList = results.map((doc) => [
        doc.counsellor_user_id,
        doc.date_slot,
        doc.time_slot,
        doc.booking_status,
      ]);
    }
  );
  for (let i = 0; i < attributeList.length; i++) {
    let username;
    try {
      username = (await User.findOne({ _id: attributeList[i][0] })).username;
      attributeList[i][0] = username;
    } catch (err) {
      console.log(err);
    }
  }
  for (let i = 0; i < attributeList.length; i++) {
    let timimg;
    if (attributeList[i][2] < 12) timimg = attributeList[i][2] + "am";
    else timimg = attributeList[i][2] - 12 + "pm";
    attributeList[i][2] = timimg;
  }
  for (let i = 0; i < attributeList.length; i++) {
    let booking_status;
    if (attributeList[i][3] == 0) booking_status = "pending";
    else if (attributeList[i][3] == 1) booking_status = "accepted";
    else booking_status = "rejected";
    attributeList[i][3] = booking_status;
  }
  res.json({ message: attributeList });
});


// =====================================
// SWIM GYM INSTRUCTOR DASHBOARD
// =====================================

app.get('/swim_gym_instructor_dashboard', async (req, res) => {
  let attributeList;
  await Swim_Gym_Memberships.find({}).then((results) => {
    attributeList = results.map((doc) => [doc.user_id, doc.year, doc.month, doc.type, doc.booking_status]);
  });
  res.json({ message: attributeList });
});


app.get('/check_gym_enrollment', async (req, res) => {
  let attributeList=[];
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let headerList =[];
  headerList.push("username");
  headerList.push("year");
  headerList.push("month");
  attributeList.push(headerList);
  await Swim_Gym_Memberships.find({type: 0, booking_status: 1, year: year, month: month})
    .then((results) => {
      attributeList.push(...results.map((doc) => [doc.user_id, doc.year, doc.month]));
    })
    .catch((err) => {
      console.log(err);
  });
  for(let i = 1; i<attributeList.length; i++) {
    let username
    try {
      username=(await User.findOne({_id:attributeList[i][0]})).username;
      attributeList[i][0]=username;
    }
    catch(err) {
      console.log(err);
    }
  }
  for(let i = 1; i<attributeList.length; i++) {
    let month
    if(attributeList[i][2]==1) month="january";
    else if(attributeList[i][2]==2) month="february";
    else if(attributeList[i][2]==3) month="march";
    else if(attributeList[i][2]==4) month="april";
    else if(attributeList[i][2]==5) month="may";
    else if(attributeList[i][2]==6) month="june";
    else if(attributeList[i][2]==7) month="july";
    else if(attributeList[i][2]==8) month="august";
    else if(attributeList[i][2]==9) month="september";
    else if(attributeList[i][2]==10) month="october";
    else if(attributeList[i][2]==11) month="november";
    else if(attributeList[i][2]==12) month="december";
    attributeList[i][2]=month;
  }
  res.json({ message: attributeList });
});

app.post('/check_swim_enrollment', async (req, res) => {
  let attributeList=[];
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let headerList =[];
  headerList.push("username");
  headerList.push("year");
  headerList.push("month");
  attributeList.push(headerList);
  await Swim_Gym_Memberships.find({type: 1, booking_status: 1, year: year, month: month})
    .then((results) => {
      attributeList.push(...results.map((doc) => [doc.user_id, doc.year, doc.month]));
    })
    .catch((err) => {
      console.log(err);
  });
  for(let i = 1; i<attributeList.length; i++) {
    let username
    try {
      username
      =(await User.findOne({_id:attributeList[i][0]})).username;
      attributeList[i][0]=username;
    }
    catch(err) {
      console.log(err);
    }
  }
  for(let i = 1; i<attributeList.length; i++) {
    let month
    if(attributeList[i][2]==1) month="january";
    else if(attributeList[i][2]==2) month="february";
    else if(attributeList[i][2]==3) month="march";
    else if(attributeList[i][2]==4) month="april";
    else if(attributeList[i][2]==5) month="may";
    else if(attributeList[i][2]==6) month="june";
    else if(attributeList[i][2]==7) month="july";
    else if(attributeList[i][2]==8) month="august";
    else if(attributeList[i][2]==9) month="september";
    else if(attributeList[i][2]==10) month="october";
    else if(attributeList[i][2]==11) month="november";
    else if(attributeList[i][2]==12) month="december";
    attributeList[i][2]=month;
  }
  res.json({ message: attributeList });
});

app.get('/pending_gym_enrollment', async (req, res) => {
  let attributeList=[];
  let headerList =[];
  headerList.push("username");
  headerList.push("year");
  headerList.push("month");
  attributeList.push(headerList);
  await Swim_Gym_Memberships.find({type: 0, booking_status: 0})
    .then((results) => {
      attributeList.push(...results.map((doc) => [doc.user_id, doc.year, doc.month]));
    })
    .catch((err) => {
      console.log(err);
  });
  for(let i = 1; i<attributeList.length; i++) {
    let username
    try {
      username=(await User.findOne({_id:attributeList[i][0]})).username;
      attributeList[i][0]=username;
    }
    catch(err) {
      console.log(err);
    }
  }
  for(let i = 1; i<attributeList.length; i++) {
    let month
    if(attributeList[i][2]==1) month="january";
    else if(attributeList[i][2]==2) month="february";
    else if(attributeList[i][2]==3) month="march";
    else if(attributeList[i][2]==4) month="april";
    else if(attributeList[i][2]==5) month="may";
    else if(attributeList[i][2]==6) month="june";
    else if(attributeList[i][2]==7) month="july";
    else if(attributeList[i][2]==8) month="august";
    else if(attributeList[i][2]==9) month="september";
    else if(attributeList[i][2]==10) month="october";
    else if(attributeList[i][2]==11) month="november";
    else if(attributeList[i][2]==12) month="december";
    attributeList[i][2]=month;
  }
  res.json({ message: attributeList });
});

app.post('/accept_gym_enrollment', async (req, res) =>{
  let username=req.body.username;
  let year=req.body.year;
  let month=req.body.month;
  console.log(username);
  console.log(year);
  console.log(month);
  if(month==="january") month=1;
  else if(month==="february") month=2;
  else if(month==="march") month=3;
  else if(month==="april") month=4;
  else if(month==="may") month=5;
  else if(month==="june") month=6;
  else if(month==="july") month=7;
  else if(month==="august") month=8;
  else if(month==="september") month=9;
  else if(month==="october") month=10;
  else if(month==="november") month=11;
  else if(month==="december") month=12;
  try
  {
    let user_id=(await User.findOne({username:username}))._id;
    let doc = await Swim_Gym_Memberships.findOne({user_id:user_id, year:year, month:month, type:0});
    console.log(doc);
    doc.booking_status=1;
    doc.save();
  }
  catch(err)
  {
    console.log(err);
  }
  res.json({ message: "Enrollment accepted successfully" });
});

app.post('/accept_swim_enrollment', async (req, res) =>{
  let username=req.body.username;
  let year=req.body.year;
  let month=req.body.month;
  console.log(username);
  console.log(year);
  console.log(month);
  if(month==="january") month=1;
  else if(month==="february") month=2;
  else if(month==="march") month=3;
  else if(month==="april") month=4;
  else if(month==="may") month=5;
  else if(month==="june") month=6;
  else if(month==="july") month=7;
  else if(month==="august") month=8;
  else if(month==="september") month=9;
  else if(month==="october") month=10;
  else if(month==="november") month=11;
  else if(month==="december") month=12;
  try
  {
    let user_id=(await User.findOne({username:username}))._id;
    let doc = await Swim_Gym_Memberships.findOne({user_id:user_id, year:year, month:month, type:1});
    console.log(doc);
    doc.booking_status=1;
    doc.save();
  }
  catch(err)
  {
    console.log(err);
  }
  res.json({ message: "Enrollment accepted successfully" });
});


app.get('/get_statistics', async (req, res) => {
  let attributeList=[];
  let bookingJanuary=0;
  let bookingFebruary=0;
  let bookingMarch=0;
  let bookingApril=0;
  let bookingMay=0;
  let bookingJune=0;
  let bookingJuly=0;
  let bookingAugust=0;
  let bookingSeptember=0;
  let bookingOctober=0;
  let bookingNovember=0;
  let bookingDecember=0;

  let totalApplied=0;
  let totalAccepted=0;
  let totalRejected=0;
  let totalPending=0;

  await Swim_Gym_Memberships.find({type: 0})
    .then((results) => {
      attributeList.push(...results.map((doc) => [doc.user_id, doc.month, doc.booking_status]));
    })
    .catch((err) => {
      console.log(err);
  });

  finalAttributeList=[];
  let header=[];
  header.push("Metric");
  header.push("Value");
  finalAttributeList.push(header);
  let headerMonth_1=[];
  headerMonth_1.push("January");
  finalAttributeList.push(headerMonth_1);
  let headerMonth_2=[];
  headerMonth_2.push("February");
  finalAttributeList.push(headerMonth_2);
  let headerMonth_3=[];
  headerMonth_3.push("March");
  finalAttributeList.push(headerMonth_3);
  let headerMonth_4=[];
  headerMonth_4.push("April");
  finalAttributeList.push(headerMonth_4);
  let headerMonth_5=[];
  headerMonth_5.push("May");
  finalAttributeList.push(headerMonth_5);
  let headerMonth_6=[];
  headerMonth_6.push("June");
  finalAttributeList.push(headerMonth_6);
  let headerMonth_7=[];
  headerMonth_7.push("July");
  finalAttributeList.push(headerMonth_7);
  let headerMonth_8=[];
  headerMonth_8.push("August");
  finalAttributeList.push(headerMonth_8);
  let headerMonth_9=[];
  headerMonth_9.push("September");
  finalAttributeList.push(headerMonth_9);
  let headerMonth_10=[];
  headerMonth_10.push("October");
  finalAttributeList.push(headerMonth_10);
  let headerMonth_11=[];
  headerMonth_11.push("November");
  finalAttributeList.push(headerMonth_11);
  let headerMonth_12=[];
  headerMonth_12.push("December");
  finalAttributeList.push(headerMonth_12);
  let headerTotalApplied=[];
  headerTotalApplied.push("Total Applied");
  finalAttributeList.push(headerTotalApplied);
  let headerTotalAccepted=[];
  headerTotalAccepted.push("Total Accepted");
  finalAttributeList.push(headerTotalAccepted);
  let headerTotalRejected=[];
  headerTotalRejected.push("Total Rejected");
  finalAttributeList.push(headerTotalRejected);
  let headerTotalPending=[];
  headerTotalPending.push("Total Pending");
  finalAttributeList.push(headerTotalPending);

  for(i=0;i<attributeList.length;i++)
  {
    if(attributeList[i][1]==1)
    {
      bookingJanuary++;
    }
    else if(attributeList[i][1]==2)
    {
      bookingFebruary++;
    }
    else if(attributeList[i][1]==3)
    {
      bookingMarch++;
    }
    else if(attributeList[i][1]==4)
    {
      bookingApril++;
    }
    else if(attributeList[i][1]==5)
    {
      bookingMay++;
    }
    else if(attributeList[i][1]==6)
    {
      bookingJune++;
    }
    else if(attributeList[i][1]==7)
    {
      bookingJuly++;
    }
    else if(attributeList[i][1]==8)
    {
      bookingAugust++;
    }
    else if(attributeList[i][1]==9)
    {
      bookingSeptember++;
    }
    else if(attributeList[i][1]==10)
    {
      bookingOctober++;
    }
    else if(attributeList[i][1]==11)
    {
      bookingNovember++;
    }
    else if(attributeList[i][1]==12)
    {
      bookingDecember++;
    }
    if(attributeList[i][2]==0) totalPending++;
    else if(attributeList[i][2]==1) totalAccepted++;
    else totalRejected++;
    totalApplied++;
  }
  finalAttributeList[1].push(bookingJanuary);
  finalAttributeList[2].push(bookingFebruary);
  finalAttributeList[3].push(bookingMarch);
  finalAttributeList[4].push(bookingApril);
  finalAttributeList[5].push(bookingMay);
  finalAttributeList[6].push(bookingJune);
  finalAttributeList[7].push(bookingJuly);
  finalAttributeList[8].push(bookingAugust);
  finalAttributeList[9].push(bookingSeptember);
  finalAttributeList[10].push(bookingOctober);
  finalAttributeList[11].push(bookingNovember);
  finalAttributeList[12].push(bookingDecember);
  finalAttributeList[13].push(totalApplied);
  finalAttributeList[14].push(totalAccepted);
  finalAttributeList[15].push(totalRejected);
  finalAttributeList[1].push(totalPending);

  res.json({ message: finalAttributeList });
});



//////Active-booking available slots
app.post("/getAvailableSlots", async (req, res) => {
  const { date, type_of_sport,capacity } = req.body;
  console.log(req.body);
  try {
    const bookings = await SportsBookings.find({ date_slot: date, type_of_sport: type_of_sport, booking_status: 1 });
    const bookedSlots = bookings.reduce((acc, booking) => {
      if (!acc[booking.time_slot]) {
        acc[booking.time_slot] = 1;
      } else {
        acc[booking.time_slot]++;
      }
      return acc;
    }, {});
    console.log(bookedSlots);
    // Generate all possible slots
    const allSlots = [
      "6", "7", "8","16", "17", 
      "18", "19", "20"
    ];

    // Determine available slots
    const availableSlots = allSlots.filter(slot => {
      return !bookedSlots.hasOwnProperty(slot) || bookedSlots[slot] < capacity;
    });

    res.json({ availableSlots });
  } catch (error) {
    console.error("Error fetching available slots for date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



///////////Gym and Pool membership pass
app.get('/gym/swim_pass', async (req, res) => {
  try {
    const { userid, year, month,type } = req.query;
    console.log(req.query);
    // Fetch membership details from the database based on the provided parameters
    const membershipDetails = await Gymbook.find({
      user_id: userid,
      year: year,
      month: month,
      type:type,
      booking_status:1,
    });


    const formattedTimeSlots = membershipDetails.map(detail => {
      const startTime = `${detail.time_slot}:00 `; // Assuming slots are in AM
      const endTime = `${detail.time_slot + 1}:00`; // Assuming each slot is 1 hour
      return `${startTime}-${endTime}`;
    });

    // Send the formatted time slots back to the client
    res.json(formattedTimeSlots);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching membership details." });
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
      time_slot: time_slot,
      user_id: user_id,
      year: year,
      type:type,
    });

    if (existingBooking) {
      // User has already booked the slot
      return res.status(400).json({ error: "You have already booked this slot." });
    }

    // Check if the maximum capacity for the slot has been reached
    const countBookings = await Gymbook.countDocuments({
      month: month,
      time_slot: time_slot,
      year: year,
      booking_status:1,
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
      return res.status(400).json({ error: "Maximum capacity for this slot has been reached." });
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
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});
