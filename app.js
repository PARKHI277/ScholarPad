require("dotenv").config();
const express = require("express");
require("./config/dbconfig");
const registerRouter = require("./router/signUp");
const loginRouter = require("./router/login");
const editRouter = require("./router/editProfile");
const listRouter = require("./router/list");
const collegeRouter = require("./router/college");
const nationalRouter = require("./router/national");
const internationalRouter = require("./router/international");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//middlewares
app.get("/", (req, res) => {
  res.send("Hi,the API is working.");
});

app.use("/api/v1", registerRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", editRouter);
app.use("/api/v1", listRouter);
app.use("/api/v1", collegeRouter);
app.use("/api/v1", nationalRouter);
app.use("/api/v1", internationalRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`connection succesful  at port ${port}`);
});
