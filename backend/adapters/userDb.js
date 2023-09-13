const {connect} = require("mongoose");

require("dotenv").config();

connect(process.env.URL)
  .then(() => {
    console.log("MongoDB Connected successfully user");
  })
  .catch((err) => {
    console.log(err);
  });
