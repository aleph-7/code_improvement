const express = require("express");
const Tutorial = require("../models/contentDB").tutorialSchema;
const router = express.Router();

router.get("/badminton", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for badminton");
  await Tutorial.find({ type_of_sport: "badminton" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/basketball", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for basketball");
  await Tutorial.find({ type_of_sport: "basketball" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/cricket", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for cricket");
  await Tutorial.find({ type_of_sport: "cricket" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/football", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for football");
  await Tutorial.find({ type_of_sport: "football" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/gym", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for gym");
  await Tutorial.find({ type_of_sport: "gym" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/hockey", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for hockey");
  await Tutorial.find({ type_of_sport: "hockey" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/squash", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for squash");
  await Tutorial.find({ type_of_sport: "squash" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/swimming", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for swimming");
  await Tutorial.find({ type_of_sport: "swimming" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/table_tennis", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for table tennis");
  await Tutorial.find({ type_of_sport: "table_tennis" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/tennis", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for tennis");
  await Tutorial.find({ type_of_sport: "tennis" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/volleyball", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for volleyball");
  await Tutorial.find({ type_of_sport: "volleyball" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

router.get("/yoga", async (req, res) => {
  let attributeList;
  console.log("Request raised to fetch tutorials for yoga");
  await Tutorial.find({ type_of_sport: "yoga" }).then((results) => {
    attributeList = results.map((doc) => [doc.title, doc.source, doc.link]);
  });
  res.json({ message: attributeList });
  console.log("Tutorials Fetched");
});

module.exports = router;
