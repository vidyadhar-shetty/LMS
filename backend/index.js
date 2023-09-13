const express = require("express");
require("dotenv").config();
require("./adapters/userDb");
let userRoutes = require("./routes/users.routes");
let cors = require("cors");
let app = express();

//!It is used to accept JSON data from req body
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(cors());

app.use(express.static("./public"));

app.use("/api/user", userRoutes);
//! Page Not Found Middleware

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Page Not Found" });
});

//! Error Handling Middleware

app.use((error, req, res, next) => {
  res.status(404).json({ error: true, message: error.message, data: "OK" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On PORT ${process.env.PORT}`);
});
