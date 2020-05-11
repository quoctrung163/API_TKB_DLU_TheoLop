const express = require("express");
const bodyparser = require("body-parser");
const { getSchedule } = require("./js/handleApi");

const port = 8000;
const app = express();

app.use(bodyparser.json());

app.get("/", async (req, res) => {
  console.log(req.query.week, req.query.classID);
  let data = await getSchedule(req.query.week, req.query.classID);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://${port}/`);
});
