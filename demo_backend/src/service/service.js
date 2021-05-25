"use strict";
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://envision-user:utDqZf9yWIFW87Ej@envision-cluster.pgpms.mongodb.net/envision-db?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  poolSize: 2,
  promiseLibrary: global.Promise,
});

async function getDataByDirectAndTime(direction, timestamp) {
  let count = 0;
  try {
    // Connect the client to the server
    await client.connect();
    // Establish connection
    const database = client.db("envision-db");
    const collection = database.collection("sample-data");
    // query data
    const weekDaysArr = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];
    const weekendArr = ["Saturday", "Sunday"];
    await collection.find({ direction: direction }).forEach((data) => {
      const day = new Date(data.timestamp).getDay();
      if (timestamp === "weekdays") {
        if (weekDaysArr[day]) {
          count++;
        }
      } else if (timestamp === "weekend") {
        if (weekendArr[day]) {
          count++;
        }
      }
    });
    return count;
  } catch (err) {
    console.error(err);
  }
}

async function getAllData() {
  let allResult = [];
  try {
    // Connect the client to the server
    await client.connect();
    // Establish connection
    const database = client.db("envision-db");
    const collection = database.collection("sample-data");
    // query data
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    await collection.find().forEach((data) => {
      allResult.push(data);
    });
    // save allResult
    return allResult;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getDataByDirectAndTime,
  getAllData,
};
