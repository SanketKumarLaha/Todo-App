const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/todo", todoRoute);
app.use("/api/user", userRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening to port", PORT);
      console.log("connected to db");
    });
  })
  .catch((error) => console.log(error));
