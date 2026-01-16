const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const port = process.env.PORT;
const app = express();
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  console.log("API is running");
  res.send("Hello Note Ai");
});

// routes
const noteRoutes = require("./routes/note/note");
// const userRoutes = require("./routes/user/user");
app.use("/notes", noteRoutes);
// app.use("/users", userRoutes);