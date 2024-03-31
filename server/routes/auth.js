const express = require("express");
const User = require("../models/userDB").userSchema;
const Leaderboard_Badminton =
  require("../models/leaderboardDB").badmintonLeaderboardSchema;
const Leaderboard_Squash =
  require("../models/leaderboardDB").squashLeaderboardSchema;
const Leaderboard_Tennis =
  require("../models/leaderboardDB").tennisLeaderboardSchema;
const Leaderboard_TableTennis =
  require("../models/leaderboardDB").tabletennisLeaderboardSchema;
const Record = require("../models/userDB").recordSchema;
const router = express.Router();
const jsw = require("jsonwebtoken");
const secretKey =
  "a3e31fd2b7ed999b65ee2653024297b9f737e282afb9b686d8401e10c617a591";
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "elysium.253@gmail.com",
    pass: "gcrtrubzbofhruzy",
  },
});

router.post("/signup", async (req, res) => {
  try {
    // Check if the username or email ID already exists in the database
    console.log("SignUp request recieved for: ", req.body.username);
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email_id: req.body.email_id }],
    });

    // If user with the same username or email ID already exists, return an error
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email ID already exists" });
    }

    // Hashing the passwords before saving them to the database
    const hashed_password = await bcrypt.hash(req.body.password, 10);
    // Creating a new user
    let new_user = null;
    let doc = null;
    if (req.body.user_category == 1) {
      new_user = new User({
        username: req.body.username,
        email_id: req.body.email_id,
        user_category: req.body.user_category,
        password: hashed_password,
        profile_pic: "",
        type_of_sport: req.body.sport,
        validity: "false",
      });
      doc = await new_user.save();
    } else {
      new_user = new User({
        username: req.body.username,
        email_id: req.body.email_id,
        user_category: req.body.user_category,
        password: hashed_password,
        profile_pic: "",
        type_of_sport: "",
        validity: "true",
      });
      doc = await new_user.save();
    }
    // Saving the user to the database

    if (req.body.user_category == 1) {
      //Send Mail
      const token = jsw.sign(
        {
          username: new_user.username,
          userMongoId: new_user._id,
          category: new_user.user_category,
          type_of_sport: new_user.type_of_sport,
        },
        secretKey,
        {
          expiresIn: "1 hour",
        }
      );
      const mailOptions = {
        from: "elysium.253@gmail.com",
        to: req.body.email_id,
        subject: "[elysium] email verification",
        text: `Hi, ${new_user.username}! Please click on the link to verify your email: https://elysium-231i.onrender.com/verification?token=${token}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
      badminton_db_length = await Leaderboard_Badminton.find().countDocuments();
      const badminton_leaderboard = new Leaderboard_Badminton({
        user_id: doc._id,
        position: badminton_db_length + 1,
      });
      await badminton_leaderboard.save();

      squash_db_length = await Leaderboard_Squash.find().countDocuments();
      const squash_leaderboard = new Leaderboard_Squash({
        user_id: doc._id,
        position: squash_db_length + 1,
      });
      await squash_leaderboard.save();

      table_tennis_db_length =
        await Leaderboard_TableTennis.find().countDocuments();
      const table_tennis_leaderboard = new Leaderboard_TableTennis({
        user_id: doc._id,
        position: table_tennis_db_length + 1,
      });
      await table_tennis_leaderboard.save();

      tennis_db_length = await Leaderboard_Tennis.find().countDocuments();
      const tennis_leaderboard = new Leaderboard_Tennis({
        user_id: doc._id,
        position: tennis_db_length + 1,
      });
      await tennis_leaderboard.save();
      const new_record = new Record({
        user_id: doc._id,
        acceptances: 0,
        rejections: 0,
      });
      await new_record.save();
    }
    // Sending the response to the frontend
    console.log("Signup Successful");
    res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    // Sending the error message to the frontend
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.get("/verification", async (req, res) => {
  token = req.query.token;
  const decoded = jsw.verify(token, secretKey);
  user = await User.findOne({ _id: decoded.userMongoId });
  if (user.validity === "true") {
    console.log("Already Verified");
  } else {
    user.validity = "true";
    console.log("User " + decoded.username + " verified");
    await user.save();
  }
  res.json({ message: "User " + decoded.username + " verified" });
});

router.post("/login", async (req, res) => {
  console.log("Login Request for " + req.body.username);
  try {
    user = await User.findOne({ username: req.body.username });
    if (user) {
      email = user.email_id;
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordMatch) {
        const token = jsw.sign(
          {
            username: user.username,
            userMongoId: user._id,
            category: user.user_category,
            type_of_sport: user.type_of_sport,
          },
          secretKey,
          {
            expiresIn: "1 hour",
          }
        );
        if (user.validity == "false") {
          console.log("User is not verified");
          //Send Email.

          const mailOptions = {
            from: "elysium.253@gmail.com",
            to: email,
            subject: "[elysium] email verification",
            text: `Hi, ${user.username}! Please click on the link to verify your email: https://elysium-231i.onrender.com/verification?token=${token}`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });
          return res.status(403).json({ error: "Please verify your email" });
        } else {
          console.log("User is Verified");
          res.status(200).json({
            token,
            userMongoId: user._id,
            userId: user.username,
            email: user.email_id,
            category: user.user_category,
            profile_pic: user.profile_pic,
            type_of_sport: user.type_of_sport,
          });
        }
      } else {
        console.log("Password Mismatch");
        return res
          .status(401)
          .json({ error: "Please enter the correct password." });
      }
    } else {
      console.log("User not found");
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
