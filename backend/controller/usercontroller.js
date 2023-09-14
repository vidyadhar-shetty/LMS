const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

const mime = require("mime");
const path = require("path");

const signUp = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "Sign-up failed - Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      error: false,
      message: "User sign-up successful",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Login failed - Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: true, message: "Login failed - Invalid credentials" });
    }

    const role = user.role;

    res.status(200).json({ error: false, message: "Login successful", role });
  } catch (err) {
    next(err);
  }
};

const updateStudentDetails = async (req, res, next) => {
  try {
    const { email, name, contact } = req.body;
    const pdfFile = req.file;

    console.log(email);
    console.log(pdfFile);
    console.log("pdfFile path:", pdfFile.path);

    if (!email || !name || !contact || !pdfFile) {
      return res
        .status(400)
        .json({ error: true, message: "Missing required fields" });
    }

    const allowedMimeTypes = ["application/pdf"];
    const fileMimeType = mime.getType(pdfFile.originalname);

    if (!fileMimeType || !allowedMimeTypes.includes(fileMimeType)) {
      return res.status(400).json({
        error: true,
        message: "Invalid file type - Only PDF files are allowed",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "Student not found" });
    }
    
    let port = "http://localhost:4500"
    let path = req.file.path.split("public")[1];
    let filePath=port+path
console.log("file path ----", filePath)
    user.name = name;
    user.contact = contact;
    user.file = filePath;

    await user.save();

    return res.status(200).json({
      error: false,
      message: "Student details added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const role = "teacher";
    console.log(role);

    const students = await User.find({ role: "student" });

    if (!students || students.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No students available",
        data: null,
      });
    }

    res.status(200).json({
      error: false,
      message: "All students fetched successfully",
      data: students,
    });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message, data: null });
  }
};

module.exports = {
  signUp,
  login,
  updateStudentDetails,
  getAllStudents,
};
