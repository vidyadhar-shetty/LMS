const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  signUp,
  login,
  updateStudentDetails,
  getAllStudents,
} = require("../controller/usercontroller");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/signup", signUp);
router.post("/login", login);
router.post("/updateStudentDetails",upload.single("file") ,updateStudentDetails);
router.get("/getAllStudents", getAllStudents);

module.exports = router;
