const express = require("express");
const router = express.Router();
const User = require("../models/userDB").userSchema;
const Yoga_Sessions = require("../models/contentDB").yoga_sessionSchema;

router.post("/post_yoga_session", async (req, res) => {
  const yoga_instructor_id = req.body.yoga_instructor_id;
  const content = req.body.content;
  const location = req.body.location;
  let batchsize = req.body.batch_size;
  batchsize = parseInt(batchsize);
  const date = req.body.date;
  const startTime = req.body.start_time;
  const endTime = req.body.end_time;
  console.log("Request to post yoga session received");

  let attributeList = [];
  //dont allow to post session if already a session is posted on the same date and time
  await Yoga_Sessions.find({
    yoga_instructor_user_id: yoga_instructor_id,
    date_slot: date,
    time_slot_start: startTime,
  }).then((results) => {
    attributeList = results.map((doc) => [doc.date_slot, doc.time_slot_start]);
  });
  if (attributeList.length > 0) {
    res.json({ message: "Session already posted on the same date and time" });
    return;
  }
  const doc = Yoga_Sessions({
    yoga_instructor_user_id: yoga_instructor_id,
    content: content,
    location: location,
    max_strength: batchsize,
    date_slot: date,
    time_slot_start: startTime,
    time_slot_end: endTime,
  });
  await doc.save();
  res.json({ message: "Session posted successfully" });
});

router.post("/yoga_sessions_yoga_dashboard", async (req, res) => {
  yoga_instructor_id = req.body.yoga_instructor_id;
  let attributeList;
  console.log(
    "Request to view yoga sessions received for yoga instructor : ",
    yoga_instructor_id
  );
  await Yoga_Sessions.find({
    yoga_instructor_user_id: yoga_instructor_id,
  }).then((results) => {
    attributeList = results.map((doc) => [doc.date_slot, doc.time_slot_start]);
  });
  let finalAttributeList = [];
  for (let i = 0; i < attributeList.length; i++) {
    let time;
    if (attributeList[i][1] < 12) {
      time = attributeList[i][1].toString() + " AM";
    } else {
      time = (attributeList[i][1] - 12).toString() + " PM";
    }
    finalAttributeList.push(attributeList[i][0] + " " + time);
  }
  res.json({ message: finalAttributeList });
});

router.post("/view_enrollment_yoga_dashboard", async (req, res) => {
  const yoga_instructor_id = req.body.yoga_instructor_id;
  const yoga_session_day_date = req.body.yoga_session_day_date;
  let date_slot = yoga_session_day_date.split(" ")[0];
  let time =
    yoga_session_day_date.split(" ")[1] +
    " " +
    yoga_session_day_date.split(" ")[2];
  console.log(
    "Request to view enrollment received for yoga instructor : ",
    yoga_instructor_id,
    "on date : ",
    date_slot,
    "and time : ",
    time
  );
  let time_slot_start;
  if (time == "0 AM") {
    time_slot_start = 0;
  } else if (time == "1 AM") {
    time_slot_start = 1;
  } else if (time == "2 AM") {
    time_slot_start = 2;
  } else if (time == "3 AM") {
    time_slot_start = 3;
  } else if (time == "4 AM") {
    time_slot_start = 4;
  } else if (time == "5 AM") {
    time_slot_start = 5;
  } else if (time == "6 AM") {
    time_slot_start = 6;
  } else if (time == "7 AM") {
    time_slot_start = 7;
  } else if (time == "8 AM") {
    time_slot_start = 8;
  } else if (time == "9 AM") {
    time_slot_start = 9;
  } else if (time == "10 AM") {
    time_slot_start = 10;
  } else if (time == "11 AM") {
    time_slot_start = 11;
  } else if (time == "0 PM") {
    time_slot_start = 12;
  } else if (time == "1 PM") {
    time_slot_start = 13;
  } else if (time == "2 PM") {
    time_slot_start = 14;
  } else if (time == "3 PM") {
    time_slot_start = 15;
  } else if (time == "4 PM") {
    time_slot_start = 16;
  } else if (time == "5 PM") {
    time_slot_start = 17;
  } else if (time == "6 PM") {
    time_slot_start = 18;
  } else if (time == "7 PM") {
    time_slot_start = 19;
  } else if (time == "8 PM") {
    time_slot_start = 20;
  } else if (time == "9 PM") {
    time_slot_start = 21;
  } else if (time == "10 PM") {
    time_slot_start = 22;
  } else if (time == "11 PM") {
    time_slot_start = 23;
  }
  let attributeList;
  await Yoga_Sessions.find({
    yoga_instructor_user_id: yoga_instructor_id,
    date_slot: date_slot,
    time_slot_start: time_slot_start,
  }).then((results) => {
    attributeList = results.map((doc) => [doc.participants_id]);
  });
  let finalAttributeList = [];
  let templist = [];
  templist.push("name of participant");
  finalAttributeList.push(templist);
  for (let i = 0; i < attributeList[0][0].length; i++) {
    let user_id = attributeList[0][0][i];
    let username = await User.findOne({ _id: user_id });
    let templist = [];
    templist.push(username.username);
    finalAttributeList.push(templist);
  }
  res.json({ message: finalAttributeList });
});

router.get("/yoga/getWorkshops", async (req, res) => {
  console.log("Request to retrieve workshops received");
  try {
    let attributeList;
    // Assuming the coach_user_id is passed as a query parameter
    // Retrieve workshops associated with the specified coach_user_id
    await Yoga_Sessions.find().then((results) => {
      attributeList = results.map((doc) => [
        doc.content,
        doc.participants_id.length, // Get the length of participants_id array
        doc.max_strength,
        doc.participants_id,
        doc.time_slot_start,
        doc.time_slot_end,
        doc.location,
      ]);
    });

    for (let i = 0; i < attributeList.length; i++) {
      let finalParticipantsList = [];
      for (let j = 0; j < attributeList[i][3].length; j++) {
        let user_id = attributeList[i][3][j];
        try {
          let user_name = await User.findOne({ _id: user_id });
          if (!user_name) {
            finalParticipantsList.push("Anonymous");
          } else {
            finalParticipantsList.push(user_name.username);
          }
        } catch (err) {
          console.log(err);
        }
      }
      attributeList[i][3] = finalParticipantsList;
    }
    // Sending the retrieved workshops as a response to the frontend
    res.status(200).json({ message: attributeList });
    console.log("Workshops retrieved successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve workshops" });
  }
});

router.get("/yoga/statistics", async (req, res) => {
  let attributeList = [];
  let vacancies = [];
  let totalStrength = [];
  let participants = [];
  let labels = [];
  console.log("Request to retrieve yoga statistics received");
  await Yoga_Sessions.find()
    .then((results) => {
      vacancies = results.map((doc) => doc.max_strength);
      totalStrength = results.map(
        (doc) => doc.participants_id.length + doc.max_strength
      );
      participants = results.map((doc) => doc.participants_id.length);
    })
    .catch((err) => {
      console.log(err);
    });
  for (let i = 0; i < vacancies.length; i++) {
    labels.push("Workshop " + (i + 1));
  }
  attributeList.push(labels, vacancies, totalStrength, participants, [
    { data: vacancies, label: "vacancies" },
    { data: participants, label: "participants" },
    { data: totalStrength, label: "totalStrength" },
  ]);
  res.json({ message: attributeList });
  console.log("Fetched Sucessfully ");
});

module.exports = router;
