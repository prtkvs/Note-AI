const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");

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
app.use("/notes", noteRoutes);
app.use("/users", require("./routes/user/user")); // directly 
app.use(errorHandler);