"use strict";
const {
  getDataByDirectAndTime,
  getAllData,
} = require("../service/service.js");

const getLocation = async (req, resp) => {
  const { direction, timestamp } = req.query;
  const result = await getDataByDirectAndTime(direction, timestamp);
  resp.json(result);
};
const getAll = async (req, resp) => {
  const allResult = await getAllData();
  resp.json(allResult);
};
module.exports = {
  getLocation,
  getAll,
};
