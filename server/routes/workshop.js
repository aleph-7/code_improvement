const express = require("express");
const Workshop = require("../models/contentDB").sport_workshopSchema;
const Yoga_Sessions = require("../models/contentDB").yoga_sessionSchema;
const router = express.Router();

router.get("/badminton", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch Workshop for badminton.");

  try {
    const results = await Workshop.find({ type_of_sport: "badminton" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/basketball", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for basketball.");

  try {
    const results = await Workshop.find({ type_of_sport: "basketball" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/cricket", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for cricket.");

  try {
    const results = await Workshop.find({ type_of_sport: "cricket" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/football", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for football.");

  try {
    const results = await Workshop.find({ type_of_sport: "football" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/hockey", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for hockey.");

  try {
    const results = await Workshop.find({ type_of_sport: "hockey" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/squash", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for squash.");

  try {
    const results = await Workshop.find({ type_of_sport: "squash" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/table_tennis", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for table tennis.");

  try {
    const results = await Workshop.find({ type_of_sport: "table_tennis" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/tennis", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for tennis.");

  try {
    const results = await Workshop.find({ type_of_sport: "tennis" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/volleyball", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for volleyball.");

  try {
    const results = await Workshop.find({ type_of_sport: "volleyball" });
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/yoga", async (req, res) => {
  let finalAttributeList = [];
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  console.log("Request raised to fetch workshop for yoga.");

  try {
    const results = await Yoga_Sessions.find();
    const attributeList = results.map((doc) => {
      return [
        doc.date_slot +
          "\n" +
          doc.time_slot_start.toString() +
          "hrs to " +
          doc.time_slot_end.toString() +
          "hrs",
        doc.content,
        doc.max_strength.toString() + " slots",
        doc.id,
        doc.participants_id,
        doc.max_strength,
        doc.time_slot_start,
      ];
    });
    for (let i = 0; i < attributeList.length; i++) {
      if (
        (Number(attributeList[i][0].substring(3, 5)) ===
          currentDate.getMonth() + 1 &&
          Number(attributeList[i][0].substring(0, 2)) >=
            currentDate.getDate()) ||
        Number(attributeList[i][0].substring(3, 5)) > currentDate.getMonth() + 1
      ) {
        if (
          !(
            Number(attributeList[i][6]) < currentDate.getHours() &&
            Number(attributeList[i][0].substring(0, 2)) ===
              currentDate.getDate() &&
            Number(attributeList[i][0].substring(3, 5)) ===
              currentDate.getMonth() + 1
          )
        ) {
          finalAttributeList.push(attributeList[i]);
        }
      }
    }
    res.status(200).json({ message: finalAttributeList });
    console.log("Workshops Fetched.");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
